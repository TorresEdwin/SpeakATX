// Filename - pages/about.js

import React from "react";

const services = [
    {
      name: "El Buen Servicio",
      rating: 4.5,
      language: "Spanish, English",
      area: "North Austin",
      pricing: "Mid-range",
      mapUrl: "#",
      website: "#",
    },
    {
      name: "Asian Market",
      rating: 4.2,
      language: "Chinese, English",
      area: "South Austin",
      pricing: "Budget-friendly",
      mapUrl: "#",
      website: "#",
    },
  ];
  
  const TranslationPage = () => {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Multilingual Services in Austin</h1>
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {services.map((service, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', boxShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{service.name}</h2>
              <p>⭐ {service.rating}</p>
              <p>🗣️ {service.language}</p>
              <p>📍 {service.area}</p>
              <p>💲 {service.pricing}</p>
              <div style={{ marginTop: '10px' }}>
                <a href={service.mapUrl} style={{ marginRight: '10px', textDecoration: 'none', color: 'blue' }}>🗺️ View Map</a>
                <a href={service.website} style={{ textDecoration: 'none', color: 'blue' }}>🔗 Website</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TranslationPage;
  