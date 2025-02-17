// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const translations = [
    { 
        name: "Asian Market", 
        title: "Software Engineer", 
        pay: 70, 
        language: "Spanish", 
        area: "West Campus", 
        imageUrl: "https://www.deliverlogic.com/wp-content/uploads/2021/04/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
    },
    { 
        name: "El Buen Servicio", 
        title: "Backend Developer", 
        pay: 80, 
        language: "Vietnamese", 
        area: "East Campus", 
        imageUrl: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    },
    { 
        name: "French Bakery", 
        title: "Research Scientist", 
        pay: 90, 
        language: "Chinese", 
        area: "South Campus", 
        imageUrl: "https://static.vecteezy.com/system/resources/previews/022/227/364/non_2x/openai-chatgpt-logo-icon-free-png.png"
    }
]; 

const TranslationInstance = () => {
    const { translationName } = useParams(); // Get job name from URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const translation = translations.find(translation => translation.name === translationName); // Find the matching job

    if (!translation) {
        return <div className="container mt-4"><h1>Translation Not Found</h1><button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button></div>;
    }

    return (
        <div className="container mt-4">
            <h1>{translation.name}</h1>
            <img src={translation.imageUrl} alt={translation.name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "cover" }} />
            <p><strong>Title:</strong> {translation.title}</p>
            <p><strong>Pay:</strong> ${translation.pay}/hr</p>
            <p><strong>Language:</strong> {translation.language}</p>
            <p><strong>Area:</strong> {translation.area}</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default TranslationInstance;