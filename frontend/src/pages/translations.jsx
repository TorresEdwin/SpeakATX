import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";

const TranslationPage = () => {
  return (
    <div className="container mt-4">
      <br />
      <h1 className="text-center mb-4">Multilingual Services in Austin</h1>
      <p className="mb-4">Number of services: {Instances.translations.length}</p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {Instances.translations.map((service, index) => (
          <div key={index} className="col">
            {/* Make the whole card clickable */}
            <Link to={`/translations/${service.name}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm overflow-hidden rounded">
                {/* Image at the top */}
                <img src={service.image} alt={service.name} className="service-image" />

                {/* Card Body */}
                <div className="card-body text-center">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">⭐ {service.rating}</p>
                  <p className="card-text">🗣️ {service.language}</p>
                  <p className="card-text">📍 {service.area}</p>
                  <p className="card-text">💲 {service.pricing}</p>
                </div>

                {/* Footer buttons */}
                <div className="card-footer d-flex justify-content-between">
                  <a href={service.mapUrl} className="btn btn-primary btn-sm w-50">🗺️ Map</a>
                  <a href={service.website} className="btn btn-secondary btn-sm w-50" target="_blank" rel="noopener noreferrer">🔗 Website</a>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslationPage;
