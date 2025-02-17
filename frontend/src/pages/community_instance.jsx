// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Instances from "./instances.jsx";


const CommunityInstance = () => {
    const { communityName } = useParams(); // Get job name from URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const community = Instances.communities.find(community => community.name === communityName); // Find the matching job

    if (!community) {
        return <div className="container mt-4"><h1>Community Not Found</h1><button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button></div>;
    }

    return (
        <div className="container mt-4">
            <h1>{community.name}</h1>
            <img src={community.imageUrl} alt={community.name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "cover" }} />
            <p><strong>Language:</strong> {community.language}</p>
            <p><strong>Area:</strong> {community.area}</p>
            <p><strong>About:</strong> {community.about}</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default CommunityInstance;