import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from 'react';

const TranslationPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 8; // Items per page

  useEffect(() => {
    const checkLoadedStatus = () => {
      setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
    };

    const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms

    return () => clearInterval(intervalId);
  }, []);

  if (!loaded) return <div><div className="spinner-border text-dark" role="status"></div></div>;

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Instances.translations.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(Instances.translations.length / itemsPerPage);

  // Change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Define a placeholder image for missing thumbnails
  const placeholderImage = "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png";

  return (
    <div className="container mt-4">
      <br />
      <h1 className="text-center mb-4">Multilingual Services in Austin</h1>
      <p className="mb-4">Number of services: {Instances.translations.length}</p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 justify-content-center">
        {currentItems.map((service, index) => (
          <div key={index} className="col">
            <div className="card h-100 shadow-lg overflow-hidden rounded">
              <Link to={`/translations/${service.name}`} className="text-decoration-none">
                <img 
                  src={service.imageUrl ? service.imageUrl : placeholderImage} 
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
                <a href={(service.area !== "unknown" && service.area !== "") ? "https://maps.google.com/maps?q="+service.area : "https://maps.google.com/maps?q="+service.map_location} className="btn btn-primary btn-sm" target="_blank" rel="noopener noreferrer">Map</a>
                <a href={service.website} className="btn btn-success btn-sm" target="_blank" rel="noopener noreferrer">Website</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TranslationPage;
