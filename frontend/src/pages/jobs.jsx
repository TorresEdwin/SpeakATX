// Filename - pages/about.js

import React from "react";
import styled from "styled-components";

class Job {
    constructor(name, title, pay, language, area) {
      this.name = name;
      this.title = title;
      this.pay = pay;
      this.language = language;
      this.area = area;
    }
  }

const JobsPage = () => {
    const job1 = new Job("Google", "Software Engineer", 70, "Spanish", "West Campus");
    const job2 = new Job("GitHub", "Backend Developer", 80, "English", "East Campus");
    const job3 = new Job("OpenAI", "Research Scientist", 90, "English", "South Campus");

    // Array of job links
    const jobLinks = [
        { name: job1.name, title: job1.title, pay: job1.pay, language: job1.language, area: job1.area, url: "https://www.google.com"},
        { name: job2.name, title: job2.title, pay: job2.pay, language: job2.language, area: job2.area, url: "https://www.github.com"},
        { name: job3.name, title: job3.title, pay: job3.pay, language: job3.language, area: job3.area, url: "https://www.openai.com"},
        { name: "Job 4", url: "https://www.google.com", title: "Job 4" },
        { name: "Job 5", url: "https://www.github.com", title: "Job 5" },
        { name: "Job 6", url: "https://www.openai.com", title: "Job 6" }
    ];

    return (
        <div>
            <h1>Jobs</h1>
            {/* Display number of buttons */}
            <p>Number of jobs: {jobLinks.length}</p>
            <div className="link-grid">
                {jobLinks.map((job, index) => (
                    <a 
                        key={index} 
                        href={job.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link-item"
                    >
                        {`${job.name}, Title: ${job.title}`}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default JobsPage;