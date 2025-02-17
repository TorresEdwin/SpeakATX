// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Instances from "./instances.jsx";

const JobInstance = () => {

    const { jobName } = useParams(); // Get job name from URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const job = Instances.jobs.find(job => job.name === jobName); // Find the matching job

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
            <button className="btn btn-primary mt-3 mb-5" onClick={() => navigate(-1)}>Back</button>

            <div className="row">
            <h3>{job.language} Communities</h3>
            {Instances.communities.map((communityItem, index) => (
                <div className="col-md-4 mb-3" key={index}> 
                    <Link 
                        to={`/communities/${communityItem.name}`}  // Links to dynamic job page
                        className="card text-decoration-none"
                    >
                        <img 
                            src={communityItem.imageUrl} 
                            alt={communityItem.name} 
                            className="card-img-top" 
                            style={{ height: "220px", objectFit: "cover" }} 
                        />
                        <div className="card-body">
                            <h5 className="card-title">{communityItem.name}</h5>
                            <p className="card-text">
                                {communityItem.title} <br />
                                Pay: ${communityItem.pay}/hr <br />
                                Language: {communityItem.language} <br />
                                Area: {communityItem.area}
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
            </div>

        </div>
    );
};

export default JobInstance;