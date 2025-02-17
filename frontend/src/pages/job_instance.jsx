// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Job data (same as in JobsPage.js)
const jobs = [
    { 
        name: "Google", 
        title: "Software Engineer", 
        pay: 70, 
        language: "Spanish", 
        area: "West Campus", 
        imageUrl: "https://www.deliverlogic.com/wp-content/uploads/2021/04/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
    },
    { 
        name: "GitHub", 
        title: "Backend Developer", 
        pay: 80, 
        language: "Vietnamese", 
        area: "East Campus", 
        imageUrl: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    },
    { 
        name: "OpenAI", 
        title: "Research Scientist", 
        pay: 90, 
        language: "Chinese", 
        area: "South Campus", 
        imageUrl: "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png"
    }
]; 

const JobInstance = () => {
    const { jobName } = useParams(); // Get job name from URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const job = jobs.find(job => job.name === jobName); // Find the matching job

    if (!job) {
        return <div className="container mt-4"><h1>Job Not Found</h1><button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button></div>;
    }

    return (
        <div className="container mt-4">
            <h1>{job.name}</h1>
            <img src={job.imageUrl} alt={job.name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "cover" }} />
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Pay:</strong> ${job.pay}/hr</p>
            <p><strong>Language:</strong> {job.language}</p>
            <p><strong>Area:</strong> {job.area}</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default JobInstance;