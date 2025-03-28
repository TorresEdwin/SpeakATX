from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
from bs4 import BeautifulSoup
import json
from sqlalchemy import create_engine, MetaData, Table, select
from sqlalchemy.sql import text
import os
import re

def populate_database(results, lang, engine, connection, table):

    for item in results:

        insert_stmt = table.insert().values(
            company_name=item["name"],
            member_count=item["member_count"],
            language=lang,
            area_of_austin=item["location"],
            community_type="this prob shouldn't exist",
            company_image=item["picture"],
            website_link=item["url"],
        )
        connection.execute(insert_stmt)

    connection.commit()

    print("\nPopulated with the following rows:")

    select_stmt = select(table).limit(10)

    with engine.connect() as connection:
        result = connection.execute(select_stmt)
        for row in result:
            print(row)

    connection.close()

def get_groups(url, language, driver, keywords):
    driver.get(url)

    # Wait for the page to load completely
    time.sleep(5)  # Sleep for 5 seconds to allow content to load

    # Get the page source after JavaScript has rendered the content
    page_source = driver.page_source

    # Use BeautifulSoup to parse the rendered HTML
    soup = BeautifulSoup(page_source, 'html.parser')

    # Find all group cards with the specified data-testid
    group_cards = soup.find_all('div', {'data-testid': 'group-card'})
    
    groups = []
    for group_card in group_cards:

        # Find the title
        title_tag = group_card.find('h3', {'data-testid': 'group-card-title'})
        group_name = title_tag.get_text(strip=True) if title_tag else "Title not found"

        # Find the link inside the <a> tag within the group card
        link_tag = group_card.find('a', {'id': 'group-card-in-search-results'})
        
        pic_link = "N/A"
        member_count = "N/A"
        location = "N/A"
        paragraphs = []

        if link_tag and link_tag.get('href'):
            href = link_tag['href']
            group_link = href if href.startswith("https") else f"https://www.meetup.com{href}"

            # Extract image
            img_tag = link_tag.find('img')
            if img_tag and img_tag.get('src'):
                pic_link = img_tag['src']

            # Visit the group page to extract member count & location
            driver.get(group_link)  
            time.sleep(3)  

            group_soup = BeautifulSoup(driver.page_source, 'html.parser')

            # Extract Member Count
            member_count_tag = group_soup.find("a", id="member-count-link")
            if member_count_tag:
                member_count_text = member_count_tag.get_text(strip=True)
                match = re.search(r"[\d,]+", member_count_text)  # Find number with commas
                if match:
                    member_count = match.group(0)  # Extract the full number
                    print(member_count)
                
            # Find the div with the class "break-words utils_description__BlOCA"
            description_div = group_soup.find('div', class_='break-words utils_description__BlOCA')
            # If the div is found, extract all <p> tags inside it
            if description_div:
                p_tags = description_div.find_all('p')  # Find all <p> tags inside
                for p in p_tags:
                    # Remove any links and images from the paragraph
                    for a in p.find_all('a'):
                        a.decompose()  # Remove <a> tag completely
                    for img in p.find_all('img'):
                        img.decompose()  # Remove <img> tag completely
                    paragraphs.append(p.get_text(strip=True))  # Add the cleaned paragraph
            description = "\n".join(paragraphs)
            
            # Extract the second <span> for location
            event_card = group_soup.find("a", id="event-card-e-1")
            if event_card:
                # Get all span tags inside the event card
                span_tags = event_card.find_all("span")
                if len(span_tags) > 1:  # Ensure there are at least two <span> tags
                    location = span_tags[1].get_text(strip=True)  # Get the second span

        else:
            group_link = "N/A"
            
        valid_community = any(word.lower() in group_name.lower() or word.lower() in description.lower() for word in keywords)
        print(group_link, valid_community)
        if valid_community:
            groups.append({
                "name": group_name, 
                "language": language, 
                "url": group_link,
                "picture": pic_link,
                "member_count": to_int(member_count),
                "location": location,
                "description": description
            })
    return groups

def to_int(number_str):
    return int(re.sub(r"[^\d]", "", number_str))


def save_to_json(data, filename="meetup_groups.json"):
    try:
        # Try to open the file in read mode and load the existing data
        with open(filename, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        existing_data = []

    # Append the new data to the existing data
    existing_data.append(data)

    # Open the file in write mode ("w") to save the updated content
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(existing_data, f, indent=4, ensure_ascii=False)

    print(f"Data has been written to {filename}")


def main():
    # Set up Chrome WebDriver with Selenium
    chrome_options = Options()
    # chrome_options.add_argument("--headless")  # Remove headless mode
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    base_url = "https://www.meetup.com/find/?topic=language-exchange&keywords={}&source=GROUPS&location=us--tx--austin&distance=twentyFiveMiles"
    languages = ["spanish", "french", "chinese", "german", "vietnamese", "korean", "arabic", "hindi", "somali", "tagalog"]
    keywords = [{"Spanish", "Latino", "Hola", "Mexico", "Español", "Tango", "Hispanic", "Portuguese", "Mundo", "Latin", "Português", "Basics"},
                {"French", "Bonjour", "European", "Europe", "France", "Gurdjieff", "Basics"},
                {"Chinese", "china", "Ni Hao", "Asia", "Mandarin", "Cantonese", "Basics", "Meditation", "mahjong"},
                {"German", "Europe", "European", "Basics"},
                {"Vietnamese", "Vietnam", "Asia", "Basics"},
                {"k-pop", "korean", "hanguk", "k-drama", "korea", "asia", "Basics"},
                {"Arabic", "Middle East", "Quran", "Islam", "Basics", "Ramadan", "Calligraphy", "Halal", "Dubai", "Mahmoud", "Palestine"},
                {"Hindi", "India", "Bollywood", "Namaste", "Asia", "Basics", "Sanskrit", "Holi", "Diwali", "Chai"},
                {"Somali", "Africa", "Mogadishu", "Basics", "Somaliland", "Dhaqan", "Af Soomaali", "Nomadic"},
                {"Tagalog", "Filipino", "Philippines", "Asia", "Manila", "Basics", "Balikbayan", "Mabuhay", "Luzon", "Visayas"}
                ]

    for i, language in enumerate(languages):
        url = base_url.format(language)
        print("_____________" + language + "_____________")
        groups = get_groups(url, language, driver, keywords[i])

        # password = os.environ.get("SQL_PASS", "uh oh")
        # engine = create_engine(f'mysql+pymysql://admin:{password}@database-1.cnkg4y8uupw7.us-east-2.rds.amazonaws.com:3306/SpeakATX')
        # connection = engine.connect()
        # metadata = MetaData()

        # table = Table('Communities', metadata, autoload_with=engine)

        # print("Connected to database")

        # print(f"Found columns: {[c.name for c in table.columns]}")

        # connection.execute(table.delete())
        # connection.commit()

        # populate_database(groups, language, engine, connection, table)
        save_to_json(groups)

    print(f"Scraped data saved to meetup_groups.json")
    driver.quit()


if __name__ == "__main__":
    main()
