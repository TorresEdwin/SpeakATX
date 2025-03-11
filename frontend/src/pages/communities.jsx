import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from 'react';

const CommunitiesPage = () => {
    // Array of job links
    
    const [loaded, setLoaded] = useState(Instances.loaded);
    useEffect(() => {
      const checkLoadedStatus = () => {
        setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
      };
  
      const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms
  
      return () => clearInterval(intervalId);
    }, [])
    if (!loaded) return <div><div class="spinner-border text-dark" role="status"></div></div>;

    const communityLinks = Instances.communities;

    return (
        <div className="container my-4">
            <br/>
            <h1 className="mb-4">Communities in Austin</h1>
            <p className="mb-4">Number of communities: {communityLinks.length}</p>
            
            <div className="row justify-content-center">
            {communityLinks.map((jobItem, index) => (
                <div className="col-md-3 mb-3" key={index}>
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
                                Language: {jobItem.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} <br />
                                Area: {jobItem.area} <br />
                                Member Count: {jobItem.member_count} <br />
                                Type: {jobItem.type.charAt(0).toUpperCase() + jobItem.type.slice(1)}
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
