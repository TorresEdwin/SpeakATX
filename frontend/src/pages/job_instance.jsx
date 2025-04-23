// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import Instances from "./instances.jsx";
import JobCard from "./job_card.jsx";
import ServiceCard from "./service_card.jsx";
import CommunityCard from "./community_card.jsx";

const placeholderImage = "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png";

const JobInstance = () => {
    const { jobName } = useParams(); // Get job name from URL
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

    const job = Instances.jobs.find(job => job.name === jobName); // Find the matching job

    if (!job) {
        return <div className="container mt-4"><h1>Job Not Found</h1><button className="back-button btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button></div>;
    }

    let filteredTranslations = [];
    for (let i = 0; i < Instances.translations.length; i++) {
        if (Instances.matchingValues(Instances.translations[i].language, job.language)) {
            filteredTranslations.push(Instances.translations[i]);
        }
    }

    let filteredCommunities = [];
    for (let i = 0; i < Instances.communities.length; i++) {
        if (Instances.matchingValues(Instances.communities[i].language, job.language)) {
            filteredCommunities.push(Instances.communities[i]);
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
            <h1>{job.name}</h1>
            <img 
                src={job.imageUrl ? job.imageUrl : placeholderImage} 
                alt={job.name} 
                className="img-fluid mb-3" 
                style={{ maxHeight: "300px", objectFit: "cover" }} 
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Handle broken images
            />
            <p><strong>Title:</strong> {job.title}</p>
            <p><strong>Pay:</strong> {job.pay == 0 || job.pay > 100 ? "Unknown" : "$" + job.pay + "/hr"}</p>
            <p><strong>Language:</strong> {job.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")}</p>
            <p><strong>Area:</strong> {job.area}</p>
            <p style={{ textAlign: "left", maxWidth: "900px", margin: "0 auto", whiteSpace: "pre-line" }}>
            <strong>About:</strong> <br /><br />
            {job.descr.split("•").map((item, index) => (
                <span key={index}>
                    {index > 0 && "• "} {item.trim()} <br />
                </span>
            ))}
            </p>

            <div className="d-flex justify-content-center gap-3 mt-3 mb-5">
                <button
                    className="btn btn-success button-grow"
                    style={{ transition: '0.2s ease' }}
                    onClick={() => window.open(job.website, "_blank")}
                >
                    View Job
                </button>
            </div>

            <div className="row justify-content-center">
                <h3>{job.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} Communities</h3>
                {filteredCommunities.slice(0, 4).map((communityItem, index) => (
                    <CommunityCard
                    communityItem={communityItem}
                  ></CommunityCard>
                ))}

                <h3>{job.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} Services</h3>
                {filteredTranslations.slice(0, 4).map((translationItem, index) => (
                    <ServiceCard
                    service={translationItem}
                  ></ServiceCard>
                ))}
            </div>
        </div>
    );
};

export default JobInstance;
