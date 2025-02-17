// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Instances from "./instances.jsx";

const TranslationInstance = () => {
    const { translationName } = useParams(); // Get job name from URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const translation = Instances.translations.find(translation => translation.name === translationName); // Find the matching job

    if (!translation) {
        return <div className="container mt-4"><h1>Translation Not Found</h1><button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button></div>;
    }

    return (
        <div className="container mt-4">
            <h1>{translation.name}</h1>
            <img src={translation.imageUrl} alt={translation.name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "cover" }} />
            <p><strong>Rating:</strong> {translation.rating}</p>
            <p><strong>Language:</strong> {translation.language}</p>
            <p><strong>Area:</strong> {translation.area}</p>
            <p><strong>Price:</strong> ${translation.price}/hr</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default TranslationInstance;