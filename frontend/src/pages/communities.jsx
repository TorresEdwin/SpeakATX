import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";

const CommunitiesPage = () => {
    // Array of job links
    const communityLinks = Instances.communities;

    return (
        <div className="container my-4">
            <br/>
            <h1 className="mb-4">Communities in Austin</h1>
            <p className="mb-4">Number of communities: {communityLinks.length}</p>
            
            <div className="row">
            {communityLinks.map((jobItem, index) => (
                <div className="col-md-4 mb-3" key={index}>
                    <Link 
                        to={`/communities/${jobItem.name}`}  // Links to dynamic job page
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
                                Area: {jobItem.area} <br />
                                Type: {jobItem.type}
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
            </div>
        </div>
    );
};

export default CommunitiesPage;
