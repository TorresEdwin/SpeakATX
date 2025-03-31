import pytest
import requests

BASE_URL = "https://api.speakatx.me"

# Test for health check endpoint
def test_health_check():
    response = requests.get(f"{BASE_URL}/health")
    assert response.status_code == 200
    assert response.text == 'It is OK'

# Test for getting communities
def test_get_communities():
    response = requests.get(f"{BASE_URL}/get/communities?page=1&per_page=10")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert isinstance(data["items"], list)
    assert len(data["items"]) > 0  # Ensure that there are some communities in the response

# Test for getting community by ID
def test_get_community_by_id():
    # Assume that there is a community with ID 1 in the database
    response = requests.get(f"{BASE_URL}/get/communities/id/915")
    assert response.status_code == 200  # Expecting a valid community record
    data = response.json()
    assert "community_id" in data
    assert data["community_id"] == 915

# Test for getting jobs
def test_get_jobs():
    response = requests.get(f"{BASE_URL}/get/jobs?page=1&per_page=10")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert isinstance(data["items"], list)
    assert len(data["items"]) > 0  # Ensure that there are some jobs in the response

# Test for getting job by ID
def test_get_job_by_id():
    # Assume that there is a job with ID 1 in the database
    response = requests.get(f"{BASE_URL}/get/jobs/id/803")
    assert response.status_code == 200  # Expecting a valid job record
    data = response.json()
    assert "job_id" in data
    assert data["job_id"] == 803

# Test for getting translations (services)
def test_get_translations():
    response = requests.get(f"{BASE_URL}/get/translations?page=1&per_page=10")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert isinstance(data["items"], list)
    assert len(data["items"]) > 0  # Ensure that there are some translations in the response

# Test for getting translation by ID
def test_get_translation_by_id():
    # Assume that there is a translation service with ID 1 in the database
    response = requests.get(f"{BASE_URL}/get/translations/id/1794")
    assert response.status_code == 200  # Expecting a valid service record
    data = response.json()
    assert "service_id" in data
    assert data["service_id"] == 1794
