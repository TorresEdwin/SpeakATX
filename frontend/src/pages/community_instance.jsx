// Filename - pages/JobDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import Instances from "./instances.jsx";
import JobCard from "./job_card.jsx";
import ServiceCard from "./service_card.jsx";
import CommunityCard from "./community_card.jsx";

const placeholderImage = "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png";

const CommunityInstance = () => {
    const { communityName } = useParams();
    const navigate = useNavigate();

    // Scroll to top when the route changes
    useEffect(() => {
        const timeout = setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);

        return () => clearTimeout(timeout);
    }, [useLocation()]);

    // Check if Instances are loaded
    const [loaded, setLoaded] = useState(Instances.loaded);
    useEffect(() => {
        const checkLoadedStatus = () => setLoaded(Instances.loaded);
        const intervalId = setInterval(checkLoadedStatus, 500);

        return () => clearInterval(intervalId);
    }, []);

    if (!loaded) return <div><div className="spinner-border text-dark" role="status"></div></div>;

    // Find the community by name
    const community = Instances.communities.find(c => c.name === communityName);
    if (!community) {
        return (
            <div className="container mt-4">
                <h1>Community Not Found</h1>
                <button className="back-button btn btn-primary mt-3" onClick={() => navigate(-1)}>
                    Back
                </button>
            </div>
        );
    }

    // Filter related translations and jobs
    const filteredTranslations = Instances.translations.filter(t => Instances.matchingValues(t.language, community.language));
    const filteredJobs = Instances.jobs.filter(j => Instances.matchingValues(j.language, community.language));

    return (
        <div className="container mt-4">
            <button className="back-button btn btn-primary button-fixed button-grow"
                style={{ top: '80px', left: '20px', transition: '0.2s ease' }}
                onClick={() => navigate(-1)}
            >
                Back
            </button>

            <br />
            <h1>{community.name}</h1>

            {/* Community Image */}
            <img
                src={community.imageUrl || placeholderImage}
                alt={community.name}
                className="img-fluid mb-3"
                style={{ maxHeight: "300px", objectFit: "cover" }}
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
            />

            {/* Community Details */}
            <p><strong>Language:</strong> {community.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")}</p>
            <p><strong>Area:</strong> {community.area}</p>
            <p><strong>Member Count:</strong> {community.member_count}</p>
            <p><strong>Type:</strong> {community.type.charAt(0).toUpperCase() + community.type.slice(1)}</p>
            <p style={{ textAlign: "left", maxWidth: "900px", margin: "0 auto" }}>
                <strong>About:</strong> {community.descr}
            </p>

            {/* View Community Button */}
            <div className="d-flex justify-content-center gap-3 mt-3 mb-5">
                <button className="btn btn-success button-grow"
                    style={{ transition: '0.2s ease' }}
                    onClick={() => window.open(community.website, "_blank")}
                >
                    View Community
                </button>
            </div>

            {/* Translation Services Section */}
            <div className="row d-flex justify-content-center">
                <h3>{community.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} Services</h3>
                {filteredTranslations.slice(0, 4).map((service, index) => (
                    <ServiceCard
                        service={service}
                    ></ServiceCard>
                ))}

                {/* Jobs Section */}
                <h3>{community.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} Jobs</h3>
                {filteredJobs.slice(0, 4).map((jobItem, index) => (
                    <JobCard
                        jobItem={jobItem}
                    ></JobCard>
                ))}
            </div>
        </div>
    );
};

export default CommunityInstance;
