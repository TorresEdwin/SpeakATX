import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from 'react';

const TranslationPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  useEffect(() => {
    const checkLoadedStatus = () => {
      setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
    };

    const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms

    return () => clearInterval(intervalId);
  }, [])
  if (!loaded) return <div><div class="spinner-border text-dark" role="status"></div></div>;

  return (
    <div className="container mt-4">
      <br />
      <h1 className="text-center mb-4">Multilingual Services in Austin</h1>
      <p className="mb-4">Number of services: {Instances.translations.length}</p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 justify-content-center">
        {Instances.translations.map((service, index) => (
          <div key={index} className="col">
            <div className="card h-100 shadow-lg overflow-hidden rounded">
              <Link to={`/translations/${service.name}`} className="text-decoration-none">
                <img src={service.imageUrl} alt={service.name} className="service-image" />

                <div className="card-body text-center clickable-area">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text">⭐ {service.rating}</p>
                  <p className="card-text">🗣️ {service.language.charAt(0).toUpperCase() + service.language.slice(1)}</p>
                  <p className="card-text">📍 {service.area}</p>
                  <p className="card-text">{"💲".repeat(service.price)}</p>
                </div>
              </Link>
              
              <div className="card-footer d-flex justify-content-between" style={{ marginTop: 'auto' }}>
                <a href={(service.area !== "unknown" && service.area !== "") ? "https://maps.google.com/maps?q="+service.area : "https://maps.google.com/maps?q="+service.map_location} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Map</a>
                <a href={service.website} className="btn btn-success btn-sm" target="_blank" rel="noopener noreferrer">Website</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TranslationPage;
