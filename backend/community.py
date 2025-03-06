from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
from bs4 import BeautifulSoup


def get_groups(url, driver):
    driver.get(url)

    # Wait for the page to load completely
    time.sleep(5)  # Sleep for 5 seconds to allow content to load

    # Get the page source after JavaScript has rendered the content
    page_source = driver.page_source

    # Use BeautifulSoup to parse the rendered HTML
    soup = BeautifulSoup(page_source, 'html.parser')

    # Find all group cards with the specified data-testid
    group_cards = soup.find_all('div', {'data-testid': 'group-card'})

    # Extract and print the titles from each group card
    for group_card in group_cards:
        # Find the title within each group card
        title_tag = group_card.find('h3', {'data-testid': 'group-card-title'})
        
        # If the title is found, print it
        if title_tag:
            print(title_tag.get_text(strip=True))  # Clean up the text to remove extra spaces
        else:
            print("Title not found")


def main():
    # Set up Chrome WebDriver with Selenium
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode (without opening a browser window)

    # Automatically download and use the correct version of ChromeDriver
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    # URL of the Meetup page you want to scrape
    # Define the base URL (without the keyword part)
    base_url = "https://www.meetup.com/find/?topic=language-exchange&keywords={}&source=GROUPS&location=us--tx--austin&distance=twentyFiveMiles"

    # Define the keyword you want to search for
    languages = {"spanish", "french", "chinese", "german" } # Change this to whatever keyword you want to use

    for language in languages:
        
        # Format the base URL with the keyword
        url = base_url.format(language)
        
        # Call get_groups to start scraping
        print("_____________"+language+"_____________")
        get_groups(url, driver)

    # Close the WebDriver
    driver.quit()


if __name__ == "__main__":
    main()
