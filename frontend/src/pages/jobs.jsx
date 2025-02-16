// Filename - pages/about.js

import React from "react";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="container my-4">
            <h1 className="mb-4">Jobs</h1>
            <p className="mb-4">Number of jobs: {jobLinks.length}</p>
            
            <div className="row">
                {jobLinks.map((jobItem, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <a 
                            href={jobItem.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="card text-decoration-none"
                        >
                            <img 
                                src={jobItem.imageUrl} 
                                alt={jobItem.name} 
                                className="card-img-top" 
                                style={{ height: "220px", objectFit: "cover" }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{jobItem.name}</h5>
                                <p className="card-text">
                                    {jobItem.title}, Pay: ${jobItem.pay}/hr, Language: {jobItem.language}, Area: {jobItem.area}
                                </p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobsPage;