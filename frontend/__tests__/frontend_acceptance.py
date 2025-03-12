import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
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
        
        # Configure Chrome to run in headless mode
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        
        # Set up the driver with the options
        service = Service()
        cls.driver = webdriver.Chrome(service=service, options=chrome_options)
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

    def test_h1_contains_coverage(self):
        """Test if the front page has an <h1> element with the word 'coverage'"""
        self.driver.get("https://speakatx.me/")  # Replace with your front page URL

        # Wait for the <h1> element to be present on the page
        h1_elements = WebDriverWait(self.driver, 10).until(
            EC.presence_of_all_elements_located((By.TAG_NAME, "h1"))
        )

        # Iterate over all <h1> elements and check if any contain "coverage"
        found_coverage = False
        for h1 in h1_elements:
            if "coverage" in h1.text.lower():  # Case insensitive check
                found_coverage = True
                break

        # Assert that one of the <h1> elements contains the word "coverage"
        self.assertTrue(found_coverage, "No <h1> element contains the word 'coverage'.")

    def test_splash_text2(self):
        """Check if the page title in h1 is correct"""
        self.driver.get("https://speakatx.me/")
        
        # Wait until the h1 element is visible and accessible
        p_element = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.TAG_NAME, "p"))
        )
        
        # Get the text of the h1 element and verify it
        p_text = p_element.text
        self.assertEqual("Resources for minimal english and non-english speakers in Austin, TX", p_text)  # Exact match for better validation

    def test_nonzero_services(self):
        """Check if there are nonzero instances of a specific element"""
        self.driver.get("https://speakatx.me/translations")
        
        # Find elements by a specific class or identifier
        instances = self.driver.find_elements(By.CLASS_NAME, "card-body")
        
        # Assert that at least one instance exists
        self.assertGreater(len(instances), 0, "No translations instances found")

    def test_nonzero_communities(self):
        """Check if there are nonzero instances of a specific element"""
        self.driver.get("https://speakatx.me/communities")
        
        # Find elements by a specific class or identifier
        instances = self.driver.find_elements(By.CLASS_NAME, "card-body")
        
        # Assert that at least one instance exists
        self.assertGreater(len(instances), 0, "No community instances found")

    def test_nonzero_jobs(self):
        """Check if there are nonzero instances of a specific element"""
        self.driver.get("https://speakatx.me/jobs")
        
        # Find elements by a specific class or identifier
        instances = self.driver.find_elements(By.CLASS_NAME, "card-body")
        
        # Assert that at least one instance exists
        self.assertGreater(len(instances), 0, "No job instances found")

    def test_number_of_people(self):
        """Check if there are exactly 5 team members displayed on the about page"""
        self.driver.get("https://speakatx.me/about")

        # Find all elements representing team members
        people_cards = self.driver.find_elements(By.CLASS_NAME, "card")

        # Assert that there are 5 team member cards
        self.assertEqual(len(people_cards), 5, "Number of people displayed is not 5")
        
        """
    def test_translate_spanish(self):
        #Test if Google Translate dropdown correctly changes page language to Spanish
        self.driver.get("https://speakatx.me/")

        # Wait for and click the Google Translate dropdown
        translate_dropdown = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "google_translate_element"))
        )
        translate_dropdown.click()

        # Wait for the dropdown options to be visible
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//select[@id='google_translate_element']"))
        )

        # Select Spanish language using the Select class
        select = Select(self.driver.find_element(By.ID, "google_translate_element"))
        select.select_by_value('es')

        # Assert that the page has changed language (check for Spanish text)
        translated_text = self.driver.find_element(By.XPATH, "//h1").text
        self.assertIn("Comunidades", translated_text)  # Example text in Spanish

    def test_translate_chinese(self):
        #Test if Google Translate dropdown correctly changes page language to Chinese
        self.driver.get("https://speakatx.me/")

        # Wait for and click the Google Translate dropdown
        translate_dropdown = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.ID, "google_translate_element"))
        )
        
        # Scroll to the dropdown and click using JavaScript if needed
        self.driver.execute_script("arguments[0].scrollIntoView(true);", translate_dropdown)
        self.driver.execute_script("arguments[0].click();", translate_dropdown)

        # Wait for the dropdown options to be visible
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//select[@id='google_translate_element']"))
        )

        # Select Chinese language using the Select class
        select = Select(self.driver.find_element(By.ID, "google_translate_element"))
        select.select_by_value('zh-CN')

        # Assert that the page has changed language (check for Chinese text)
        translated_text = self.driver.find_element(By.XPATH, "//h1").text
        self.assertIn("工作", translated_text)  # Example text in Chinese
        """

    def test_button_link(self):
        """Test if the 'Jobs' link navigates to the correct page"""
        self.driver.get("https://speakatx.me/")

        # Find the link using the class name or another selector
        jobs_link = self.driver.find_element(By.CSS_SELECTOR, "a.sc-fLDLck.czfOrG")

        # Click the link
        jobs_link.click()

        # Verify the URL after clicking the link
        self.assertEqual(
            self.driver.current_url, 
            "https://speakatx.me/translations", 
            f"Expected URL to be 'https://speakatx.me/translations' but got {self.driver.current_url}"
        )

    def test_service_card_link(self):
        """Test if a card links to the correct page"""
        self.driver.get("https://speakatx.me/translations")

        # Find the card link by its text or other attributes
        card_title = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//h5[text()='HOFT Institute']"))  # Adjust XPath for the card title
        )
        card_title.click()

        # Verify the new URL
        self.assertEqual(self.driver.current_url, "https://speakatx.me/translations/HOFT%20Institute")  # Replace with expected URL

    def test_job_card_link(self):
        """Test if a card links to the correct page"""
        self.driver.get("https://speakatx.me/jobs")

        # Find the card link by its text or other attributes
        card_title = WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//h5[text()='Wells Fargo']"))  # Adjust XPath for the card title
        )
        card_title.click()

        # Verify the new URL
        self.assertEqual(self.driver.current_url, "https://speakatx.me/jobs/Wells%20Fargo")  # Replace with expected URL

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()  # Close the browser

if __name__ == "__main__":
    unittest.main()
