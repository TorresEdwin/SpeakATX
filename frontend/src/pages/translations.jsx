import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const services = [
  {
    name: "El Buen Servicio",
    rating: 4.5,
    language: "Spanish, English",
    area: "North Austin",
    pricing: "Mid-range",
    mapUrl: "#",
    website: "https://github.com/",
  },
  {
    name: "Asian Market",
    rating: 4.2,
    language: "Chinese, English",
    area: "South Austin",
    pricing: "Budget-friendly",
    mapUrl: "#",
    website: "https://github.com/",
  },
  {
    name: "French Bakery",
    rating: 4.8,
    language: "French, English",
    area: "Downtown Austin",
    pricing: "Premium",
    mapUrl: "#",
    website: "https://github.com/",
  },
  {
    name: "German Deli",
    rating: 4.3,
    language: "German, English",
    area: "West Austin",
    pricing: "Mid-range",
    mapUrl: "#",
    website: "https://github.com/",
  },
  {
    name: "Japanese Market",
    rating: 4.6,
    language: "Japanese, English",
    area: "East Austin",
    pricing: "Mid-range",
    mapUrl: "#",
    website: "https://github.com/",
  },
  {
    name: "Italian Eatery",
    rating: 4.7,
    language: "Italian, English",
    area: "South Austin",
    pricing: "Premium",
    mapUrl: "#",
    website: "https://github.com/",
  },
  {
    name: "Korean BBQ",
    rating: 4.4,
    language: "Korean, English",
    area: "North Austin",
    pricing: "Mid-range",
    mapUrl: "#",
    website: "https://github.com/",
  },
  {
    name: "Indian Spices",
    rating: 4.5,
    language: "Hindi, English",
    area: "Central Austin",
    pricing: "Budget-friendly",
    mapUrl: "#",
    website: "https://github.com/",
  },
  {
    name: "Middle Eastern Grill",
    rating: 4.6,
    language: "Arabic, English",
    area: "North Austin",
    pricing: "Mid-range",
    mapUrl: "#",
    website: "https://github.com/",
  },
];

const TranslationPage = () => {
  return (
    <div className="container mt-4">
      <br/>
      <h1 className="text-center mb-4">Multilingual Services in Austin</h1>
      <p className="mb-4">Number of services: {services.length}</p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {services.map((service, index) => (
          <div key={index} className="col">
            <div className="card h-100 shadow-sm">
              <a href={service.website} className="text-decoration-none d-block h-100" target="_blank" rel="noopener noreferrer">
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">⭐ {service.rating}</p>
                  <p className="card-text">🗣️ {service.language}</p>
                  <p className="card-text">📍 {service.area}</p>
                  <p className="card-text">💲 {service.pricing}</p>
                </div>
              </a>
              <div className="card-footer d-flex justify-content-between">
                <a href={service.mapUrl} className="btn btn-primary btn-sm w-50">🗺️ Map</a>
                <a href={service.website} className="btn btn-secondary btn-sm w-50" target="_blank" rel="noopener noreferrer">🔗 Website</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslationPage;
