import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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
              <Link 
                        to={`/translations/${service.name}`}  // Links to dynamic job page
                        className="card text-decoration-none"
              >
                <div className="card-body">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">⭐ {service.rating}</p>
                  <p className="card-text">🗣️ {service.language}</p>
                  <p className="card-text">📍 {service.area}</p>
                  <p className="card-text">💲 {service.pricing}</p>
                </div>
              </Link>
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
