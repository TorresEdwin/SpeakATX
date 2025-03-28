import React from 'react';
import { Link } from 'react-router-dom';

const placeholderImage =
    "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png";

const ServiceCard = ({
    service
}) => {
    return (
        <div className="col">
            <div className="card h-100 shadow-lg overflow-hidden rounded">
                <Link to={`/translations/${service.name}`} className="text-decoration-none">
                    <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="service-image"
                        onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }} // Handle broken images
                    />
                    <div className="card-body text-center clickable-area">
                        <h5 className="card-title">{service.name}</h5>
                        <p className="card-text">⭐ {service.rating}</p>
                        <p className="card-text">🗣️ {service.language.charAt(0).toUpperCase() + service.language.slice(1)}</p>
                        <p className="card-text">📍 {service.area}</p>
                        <p className="card-text">{"💲".repeat(service.price)}</p>
                    </div>
                </Link>

                <div className="card-footer d-flex justify-content-between" style={{ marginTop: 'auto' }}>
                    <a href={(service.area !== "unknown" && service.area !== "") ? "https://maps.google.com/maps?q=" + service.area : "https://maps.google.com/maps?q=" + service.map_location} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Map</a>
                    <a href={service.website} className="btn btn-success btn-sm" target="_blank" rel="noopener noreferrer">Website</a>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;