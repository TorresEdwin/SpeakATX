// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const translations = [
    { 
        name: "Traduction Anglaise", 
        rating: "4.8", 
        language: "French, English", 
        area: "Downtown Austin", 
        price: 40,
        imageUrl: "https://img.freepik.com/premium-vector/map-city-vector-illustration_276184-55.jpg"
    },
    { 
        name: "El Buen Servicio", 
        rating: "4.5", 
        language: "Spanish, English", 
        area: "North Austin", 
        price: 25,
        imageUrl: "https://cdn.prod.website-files.com/5c29380b1110ec92a203aa84/66e5ce469b48938aa34d8684_Google%20Maps%20-%20Compressed.jpg"
    },
    { 
        name: "Bu Hui Shuo Yingwen", 
        rating: "4.2", 
        language: "Chinese, English", 
        area: "South Austin", 
        price: 15,
        imageUrl: "https://media.istockphoto.com/id/518371862/vector/abstract-city-map-illustration.jpg?s=612x612&w=0&k=20&c=LmqeyKSPkDfN_Wk4W6dxlopvIm8KYq81t1eXHM0c34E="
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
            <p><strong>Rating:</strong> {translation.rating}</p>
            <p><strong>Language:</strong> {translation.language}</p>
            <p><strong>Area:</strong> {translation.area}</p>
            <p><strong>Price:</strong> ${translation.price}/hr</p>
            <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
};

export default TranslationInstance;