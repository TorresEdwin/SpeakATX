DROP DATABASE SpeakATX;

CREATE DATABASE SpeakATX;
USE SpeakATX;

-- Local Services Table
CREATE TABLE Services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    rating DECIMAL(3,1),
    language VARCHAR(50) NOT NULL,
    area_of_austin VARCHAR(100) NOT NULL,
    pricing INT,
    map_location VARCHAR(255),
    website_link VARCHAR(255)
);

-- Local Non-English Communities Table
CREATE TABLE Communities (
    community_id INT AUTO_INCREMENT PRIMARY KEY,
    community_name VARCHAR(100) NOT NULL,
    member_count INT,
    language VARCHAR(50) NOT NULL,
    area_of_austin VARCHAR(100) NOT NULL,
    community_type VARCHAR(100) NOT NULL,
    community_image VARCHAR(255),
    website_link VARCHAR(255)
);

-- Local Non-English Friendly Job Postings Table
CREATE TABLE Jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    hourly_pay DECIMAL(8,2),
    language VARCHAR(50) NOT NULL,
    area_of_austin VARCHAR(100) NOT NULL,
    company_image VARCHAR(255),
    website_link VARCHAR(255)
);

-- Association table linking Services and Communities
CREATE TABLE Service_Community (
    service_id INT,
    community_id INT,
    PRIMARY KEY (service_id, community_id),
    FOREIGN KEY (service_id) REFERENCES Services(service_id) ON DELETE CASCADE,
    FOREIGN KEY (community_id) REFERENCES Communities(community_id) ON DELETE CASCADE
);

-- Association table linking Services and Jobs
CREATE TABLE Service_Job (
    service_id INT,
    job_id INT,
    PRIMARY KEY (service_id, job_id),
    FOREIGN KEY (service_id) REFERENCES Services(service_id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id) ON DELETE CASCADE
);

-- Association table linking Communities and Jobs
CREATE TABLE Community_Job (
    community_id INT,
    job_id INT,
    PRIMARY KEY (community_id, job_id),
    FOREIGN KEY (community_id) REFERENCES Communities(community_id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id) ON DELETE CASCADE
);

-- Index on language columns to optimize language-based queries
CREATE INDEX idx_services_language ON Services(language);
CREATE INDEX idx_communities_language ON Communities(language);
CREATE INDEX idx_jobs_language ON Jobs(language);

-- Trigger to automatically link records with matching languages (optional)
DELIMITER //
CREATE TRIGGER after_service_insert
AFTER INSERT ON Services
FOR EACH ROW
BEGIN
    -- Link service to communities with same language
    INSERT INTO Service_Community (service_id, community_id)
    SELECT NEW.service_id, community_id
    FROM Communities
    WHERE Communities.language = NEW.language;
    
    -- Link service to jobs with same language
    INSERT INTO Service_Job (service_id, job_id)
    SELECT NEW.service_id, job_id
    FROM Jobs
    WHERE Jobs.language = NEW.language;
END //

CREATE TRIGGER after_community_insert
AFTER INSERT ON Communities
FOR EACH ROW
BEGIN
    -- Link community to services with same language
    INSERT INTO Service_Community (service_id, community_id)
    SELECT service_id, NEW.community_id
    FROM Services
    WHERE Services.language = NEW.language;
    
    -- Link community to jobs with same language
    INSERT INTO Community_Job (community_id, job_id)
    SELECT NEW.community_id, job_id
    FROM Jobs
    WHERE Jobs.language = NEW.language;
END //

CREATE TRIGGER after_job_insert
AFTER INSERT ON Jobs
FOR EACH ROW
BEGIN
    -- Link job to services with same language
    INSERT INTO Service_Job (service_id, job_id)
    SELECT service_id, NEW.job_id
    FROM Services
    WHERE Services.language = NEW.language;
    
    -- Link job to communities with same language
    INSERT INTO Community_Job (community_id, job_id)
    SELECT community_id, NEW.job_id
    FROM Communities
    WHERE Communities.language = NEW.language;
END //
DELIMITER ;
