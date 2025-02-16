import React from "react";
import { useParams } from "react-router-dom";

const GoogleJob = () => {
    const { jobName } = useParams(); // Get job name from URL

    return (
        <div className="container mt-4">
            <h1>Job Details</h1>
            <p>Job: <strong>{jobName}</strong></p>
        </div>
    );
};

export default GoogleJob;