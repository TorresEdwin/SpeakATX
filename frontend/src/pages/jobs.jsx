// Filename - pages/about.js

import React from "react";
import styled from "styled-components";

class Job {
    constructor(name, title, pay, language, area, imageUrl) {
      this.name = name;
      this.title = title;
      this.pay = pay;
      this.language = language;
      this.area = area;
      this.imageUrl = imageUrl;  // Add image URL as an attribute
    }
  }

const JobsPage = () => {
    const job1 = new Job("Google", "Software Engineer", 70, "Spanish", "West Campus", "https://www.deliverlogic.com/wp-content/uploads/2021/04/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png");
    const job2 = new Job("GitHub", "Backend Developer", 80, "English", "East Campus", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png");
    const job3 = new Job("OpenAI", "Research Scientist", 90, "English", "South Campus", "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png");

    // Array of job links
    const jobLinks = [
        { name: job1.name, title: job1.title, pay: job1.pay, language: job1.language, area: job1.area, imageUrl: job1.imageUrl, url: "https://www.google.com"},
        { name: job2.name, title: job2.title, pay: job2.pay, language: job2.language, area: job2.area, imageUrl: job2.imageUrl, url: "https://www.github.com"},
        { name: job3.name, title: job3.title, pay: job3.pay, language: job3.language, area: job3.area, imageUrl: job3.imageUrl, url: "https://www.openai.com"},
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
                {jobLinks.map((jobItem, index) => (
                    <a 
                        key={index} 
                        href={jobItem.job ? jobItem.job.url : jobItem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="link-item"
                    >
                        {jobItem.job ? (
                            <>
                                <img src={jobItem.job.imageUrl} alt={jobItem.job.name} style={{ height: "120px", marginRight: "10px" }} />
                                {`${jobItem.job.name}, Title: ${jobItem.job.title}`}
                            </>
                        ) : (
                            <>
                                <img src={jobItem.imageUrl} alt={jobItem.name} style={{ height: "120px", marginRight: "10px" }} />
                                {jobItem.name}
                            </>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default JobsPage;