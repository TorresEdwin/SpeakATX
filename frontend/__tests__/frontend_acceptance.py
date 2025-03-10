import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import chromedriver_autoinstaller

class FrontendTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        # Automatically install and set up the chromedriver
        chromedriver_autoinstaller.install()
        service = Service()
        cls.driver = webdriver.Chrome(service=service)
        cls.driver.implicitly_wait(10)  # Wait for elements to load

    def test_title(self):
        """Check if the page title in h1 is correct"""
        self.driver.get("https://speakatx.me/")
        
        # Wait until the h1 element is visible and accessible
        h1_element = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.TAG_NAME, "h1"))
        )
        
        # Get the text of the h1 element and verify it
        h1_text = h1_element.text
        self.assertEqual("SpeakATX", h1_text)  # Exact match for better validation

    def test_nonzero_services(self):
        """Check if there are nonzero instances of a specific element"""
        self.driver.get("https://speakatx.me/translations")
        
        # Find elements by a specific class or identifier
        instances = self.driver.find_elements(By.CLASS_NAME, "TranslationInstance")
        
        # Assert that at least one instance exists
        self.assertGreater(len(instances), 0, "No translations instances found")

    def test_nonzero_communities(self):
        """Check if there are nonzero instances of a specific element"""
        self.driver.get("https://speakatx.me/communities")
        
        # Find elements by a specific class or identifier
        instances = self.driver.find_elements(By.CLASS_NAME, "CommunityInstance")
        
        # Assert that at least one instance exists
        self.assertGreater(len(instances), 0, "No community instances found")

    def test_nonzero_jobs(self):
        """Check if there are nonzero instances of a specific element"""
        self.driver.get("https://speakatx.me/jobs")
        
        # Find elements by a specific class or identifier
        instances = self.driver.find_elements(By.CLASS_NAME, "JobInstance")
        
        # Assert that at least one instance exists
        self.assertGreater(len(instances), 0, "No job instances found")

    def test_number_of_people(self):
        """Check if there are exactly 5 team members displayed on the about page"""
        self.driver.get("https://speakatx.me/about")

        # Find all elements representing team members
        people_cards = self.driver.find_elements(By.CLASS_NAME, "card")

        # Assert that there are 5 team member cards
        self.assertEqual(len(people_cards), 5, "Number of people displayed is not 5")

    def test_translate_spanish(self):
        """Test if Google Translate dropdown correctly changes page language to Spanish"""
        self.driver.get("https://speakatx.me/")

        # Find and click on the Google Translate dropdown
        translate_dropdown = self.driver.find_element(By.ID, "google_translate_element")
        translate_dropdown.click()

        # Select a language (e.g., Spanish)
        language_option = self.driver.find_element(By.XPATH, "//div[contains(text(), 'Spanish')]")
        language_option.click()

        # Assert that the page has changed language (e.g., check for a Spanish word)
        translated_text = self.driver.find_element(By.XPATH, "//h1").text
        self.assertIn("Comunidades", translated_text)  # Example text in Spanish

    def test_translate_chinese(self):
        """Test if Google Translate dropdown correctly changes page language to Chinese"""
        self.driver.get("https://speakatx.me/")

        # Find and click on the Google Translate dropdown
        translate_dropdown = self.driver.find_element(By.ID, "google_translate_element")
        translate_dropdown.click()

        # Select a language (e.g., Spanish)
        language_option = self.driver.find_element(By.XPATH, "//div[contains(text(), 'Chinese (Simplified)')]")
        language_option.click()

        # Assert that the page has changed language (e.g., check for a Chinese word)
        translated_text = self.driver.find_element(By.XPATH, "//h1").text
        self.assertIn("工作", translated_text)  # Example text in Chinese

    def test_button_link(self):
        """Test if the button links to the correct page"""
        self.driver.get("https://speakatx.me/")

        # Find the button by its ID or another locator
        button = self.driver.find_element(By.ID, "jobs-button")

        # Click the button
        button.click()

        # Verify the URL after clicking the button
        self.assertEqual(
            self.driver.current_url, 
            "https://speakatx.me/jobs", 
            f"Expected URL to be 'https://speakatx.me/jobs' but got {self.driver.current_url}"
        )

    def test_service_card_link(self):
        """Test if a card links to the correct page"""
        self.driver.get("https://speakatx.me/translations")

        # Find the card link by its text or other attributes
        card_link = self.driver.find_element(By.LINK_TEXT, "HOFT Institute")  # Replace with actual card text
        card_link.click()

        # Verify the new URL
        self.assertEqual(self.driver.current_url, "https://speakatx.me/translations/HOFT%20Institute")  # Replace with expected URL

    def test_job_card_link(self):
        """Test if a card links to the correct page"""
        self.driver.get("https://speakatx.me/jobs")

        # Find the card link by its text or other attributes
        card_link = self.driver.find_element(By.LINK_TEXT, "TMD Staffing")  # Replace with actual card text
        card_link.click()

        # Verify the new URL
        self.assertEqual(self.driver.current_url, "https://speakatx.me/jobs/TMD%20Staffing")  # Replace with expected URL

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()  # Close the browser

if __name__ == "__main__":
    unittest.main()