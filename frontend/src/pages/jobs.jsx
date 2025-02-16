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
    /*const buttonLabels = [
        `Name: ${job1.name}, Age: ${job2.title}, Pay: ${job3.pay}, Languae: ${job3.language},`,
        "Button 2",
        "Button 3",
        "Button 4",
        "Button 5"
      ];*/

    return (
        <div>
            <h1>
                Jobs
            </h1>
            <div className="link-grid">
            <a href="https://www.google.com" className="link-item">
            {`${job1.name}, Title: ${job1.title}, Hourly pay: ${job1.pay}, Language: ${job1.language}, Area: ${job1.area}`}
            </a>
                <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">Job 2</a>
                <a href="https://www.openai.com" target="_blank" rel="noopener noreferrer">Job 3</a>
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Job 4</a>
                <a href="https://www.github.com" target="_blank" rel="noopener noreferrer">Job 5</a>
                <a href="https://www.openai.com" target="_blank" rel="noopener noreferrer">Job 6</a>
                {/* Add more links as needed */}
            </div>
        </div>
    );
};

export default JobsPage;