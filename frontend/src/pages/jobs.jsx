// Filename - pages/about.js

import React from "react";

const JobsPage = () => {
    return (
        <div>
            <h1>
                Jobs
            </h1>
            <div className="link-grid">
                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">Job 1</a>
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