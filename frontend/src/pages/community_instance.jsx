// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect } from 'react';
import Instances from "./instances.jsx";


const CommunityInstance = () => {
    const { communityName } = useParams(); // Get job name from URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const community = Instances.communities.find(community => community.name === communityName); // Find the matching job

    if (!community) {
        return <div className="container mt-4"><h1>Community Not Found</h1><button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button></div>;
    }

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top
        }, []);

    return (
        <div className="container mt-4">
            <br/>
            <h1>{community.name}</h1>
            <img src={community.imageUrl} alt={community.name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "cover" }} />
            <p><strong>Language:</strong> {community.language}</p>
            <p><strong>Area:</strong> {community.area}</p>
            <p><strong>About:</strong> {community.about}</p>
            <button className="btn btn-primary mt-3 mb-5" onClick={() => navigate(-1)}>Back</button>

            <div className="row">
            <h3>{community.language} Translation Services</h3>
                {Instances.translations.map((translationItem, index) => (
                    <div className="col-md-4 mb-3" key={index}> 
                        <Link 
                            to={`/translations/${translationItem.name}`}  // Links to dynamic job page
                            className="card text-decoration-none"
                        >
                            <img 
                                src={translationItem.imageUrl} 
                                alt={translationItem.name} 
                                className="card-img-top" 
                                style={{ height: "220px", objectFit: "cover" }} 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{translationItem.name}</h5>
                                <p className="card-text">
                                    Rating: {translationItem.rating} <br />
                                    Language: {translationItem.language} <br />
                                    Area: {translationItem.area} <br />
                                    Price: {translationItem.price}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}

                <h3>{community.language} Jobs</h3>
                {Instances.jobs.map((jobItem, index) => (
                    <div className="col-md-4 mb-3" key={index}> 
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
                                    Language: {jobItem.language} <br />
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

export default CommunityInstance;