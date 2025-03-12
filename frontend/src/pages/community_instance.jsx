// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Instances from "./instances.jsx";

const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image+Available";

const CommunityInstance = () => {
    const { communityName } = useParams(); // Get job name from URL
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0); // Scroll to the top after a slight delay
        }, 10);

        return () => clearTimeout(timeout);
    }, [useLocation()]);

    const [loaded, setLoaded] = useState(Instances.loaded);
    useEffect(() => {
      const checkLoadedStatus = () => {
        setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
      };
  
      const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms
  
      return () => clearInterval(intervalId);
    }, []);
    
    if (!loaded) return <div><div className="spinner-border text-dark" role="status"></div></div>;
    
    const community = Instances.communities.find(community => community.name === communityName); // Find the matching job

    if (!community) {
        return <div className="container mt-4"><h1>Community Not Found</h1><button className="back-button btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button></div>;
    }

    let filteredTranslations = [];
    for (let i = 0; i < Instances.translations.length; i++) {
        if (Instances.matchingValues(Instances.translations[i].language, community.language)) {
            filteredTranslations.push(Instances.translations[i]);
        }
    }

    let filteredJobs = [];
    for (let i = 0; i < Instances.jobs.length; i++) {
        if (Instances.matchingValues(Instances.jobs[i].language, community.language)) {
            filteredJobs.push(Instances.jobs[i]);
        }
    }

    return (
        <div className="container mt-4">
            <button
                className="back-button btn btn-primary button-fixed button-grow"
                style={{ top: '80px', left: '20px', transition: '0.2s ease' }}
                onClick={() => navigate(-1)}
            >
                Back
            </button>
            <br />
            <h1>{community.name}</h1>
            <img 
                src={community.imageUrl ? community.imageUrl : placeholderImage} 
                alt={community.name} 
                className="img-fluid mb-3" 
                style={{ maxHeight: "300px", objectFit: "cover" }} 
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Handle broken images
            />
            <p><strong>Language:</strong> {community.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")}</p>
            <p><strong>Area:</strong> {community.area}</p>
            <p><strong>Member Count:</strong> {community.member_count}</p>
            <p><strong>Type:</strong> {community.type.charAt(0).toUpperCase() + community.type.slice(1)}</p>
            <p><strong>About:</strong> {community.descr}</p>

            <div className="d-flex justify-content-center gap-3 mt-3 mb-5">
                <button
                    className="btn btn-success button-grow"
                    style={{ transition: '0.2s ease' }}
                    onClick={() => window.open(community.website, "_blank")}
                >
                    View Community
                </button>
            </div>

            <div className="row d-flex justify-content-center">
                <h3>{community.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} Translation Services</h3>
                {filteredTranslations.map((translationItem, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                        <Link
                            to={`/translations/${translationItem.name}`}  
                            className="card text-decoration-none"
                        >
                            <img
                                src={translationItem.imageUrl ? translationItem.imageUrl : placeholderImage}
                                alt={translationItem.name}
                                className="card-img-top"
                                style={{ height: "220px", objectFit: "cover" }}
                                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Handle broken images
                            />
                            <div className="card-body">
                                <h5 className="card-title">{translationItem.name}</h5>
                                <p className="card-text">
                                    Rating: {translationItem.rating} <br />
                                    Language: {translationItem.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} <br />
                                    Area: {translationItem.area} <br />
                                    Price: {translationItem.price}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}

                <h3>{community.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} Jobs</h3>
                {filteredJobs.map((jobItem, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                        <Link
                            to={`/jobs/${jobItem.name}`}  
                            className="card text-decoration-none"
                        >
                            <img
                                src={jobItem.imageUrl ? jobItem.imageUrl : placeholderImage}
                                alt={jobItem.name}
                                className="card-img-top"
                                style={{ height: "220px", objectFit: "cover" }}
                                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Handle broken images
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

export default CommunityInstance;
