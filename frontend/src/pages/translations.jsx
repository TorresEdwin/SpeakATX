import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from 'react';
import JobCard from "./job_card.jsx";
import ServiceCard from "./service_card.jsx";
import CommunityCard from "./community_card.jsx";

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
          <ServiceCard
            service={service}
          ></ServiceCard>
        ))}
      </div>

      <nav className="mt-4">
        <ul className="pagination pagination-sm justify-content-center d-flex flex-wrap gap-1 overflow-auto">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link px-3"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ boxShadow: "none", outline: "none" }} // 🔥 Fixes highlight
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button
                className="page-link px-3"
                onClick={() => paginate(index + 1)}
                style={{ boxShadow: "none", outline: "none" }} // 🔥 Fixes highlight
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link px-3"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ boxShadow: "none", outline: "none" }} // 🔥 Fixes highlight
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default TranslationPage;
