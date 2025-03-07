from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
from bs4 import BeautifulSoup
import json


def get_groups(url, language, driver):
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
                member_count = member_count_text.split(" ")[0]  # Extract just the number
            
            # Extract the second <span> for location
            event_card = group_soup.find("a", id="event-card-e-1")
            if event_card:
                # Get all span tags inside the event card
                span_tags = event_card.find_all("span")
                if len(span_tags) > 1:  # Ensure there are at least two <span> tags
                    location = span_tags[1].get_text(strip=True)  # Get the second span

        else:
            group_link = "N/A"

        groups.append({
            "name": group_name, 
            "language": language, 
            "url": group_link,
            "picture": pic_link,
            "member_count": member_count,
            "location": location
        })
    return groups


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
    languages = ["spanish", "french", "chinese", "german", "vietnamese"]  

    for language in languages:
        url = base_url.format(language)
        print("_____________" + language + "_____________")
        groups = get_groups(url, language, driver)
        save_to_json(groups)

    print(f"Scraped data saved to meetup_groups.json")
    driver.quit()


if __name__ == "__main__":
    main()
