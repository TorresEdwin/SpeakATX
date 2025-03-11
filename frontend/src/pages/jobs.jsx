// Filename - pages/about.js

import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";

const JobsPage = () => {
    const [loaded, setLoaded] = useState(Instances.loaded);
    useEffect(() => {
      const checkLoadedStatus = () => {
        setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
      };
  
      const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms
  
      return () => clearInterval(intervalId);
    }, [])
    if (!loaded) return <div><div class="spinner-border text-dark" role="status"></div></div>;

    if (!Instances.loaded) return <div><div class="spinner-border text-dark" role="status"></div></div>;

    const jobLinks = Instances.jobs;

    return (
        <div className="container my-4">
            <br/>
            <h1 className="mb-4">Jobs in Austin</h1>
            <p className="mb-4">Number of jobs: {jobLinks.length}</p>
            
            <div className="row justify-content-center">
            {jobLinks.map((jobItem, index) => (
                <div className="col-md-3 mb-3" key={index}>
                    <Link 
                        to={`/jobs/${jobItem.name}`}  // Links to dynamic job page
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
                                {jobItem.title} <br />
                                Pay: ${jobItem.pay}/hr <br />
                                Language: {jobItem.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} <br />
                                Area: {jobItem.area}
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
            </div>
        </div>
    );
};

export default JobsPage;