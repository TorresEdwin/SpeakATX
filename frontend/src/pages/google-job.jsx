import React from "react";
import { useParams } from "react-router-dom";

const GoogleJob = () => {
    const { jobName } = useParams();

    return (
        <div className="container mt-4">
            <h1>Job Details</h1>
            <p>You selected the job: <strong>{jobName}</strong></p>
        </div>
    );
};

export default JobDetail;