import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from "react";

const placeholderImage =
  "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png";

const CommunitiesPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 8; // Number of items per page

  useEffect(() => {
    const checkLoadedStatus = () => {
      setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
    };

    const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms

    return () => clearInterval(intervalId);
  }, []);

  if (!loaded)
    return (
      <div>
        <div className="spinner-border text-dark" role="status"></div>
      </div>
    );

  const communityLinks = Instances.communities;

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = communityLinks.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(communityLinks.length / itemsPerPage);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4">
      <br />
      <h1 className="mb-4">Communities in Austin</h1>
      <p className="mb-4">Number of communities: {communityLinks.length}</p>

      <div className="row justify-content-center">
        {currentItems.map((communityItem, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <Link
              to={`/communities/${communityItem.name}`} // Links to dynamic community page
              className="card text-decoration-none d-flex flex-column justify-content-between"
              style={{ height: "500px" }} // Increased card height for a larger card
            >
              <img
                src={communityItem.imageUrl ? communityItem.imageUrl : placeholderImage}
                alt={communityItem.name}
                className="card-img-top"
                style={{ height: "250px", objectFit: "cover" }} // Increased image height
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImage;
                }} // Handle broken images
              />
              <div
                className="card-body d-flex flex-column justify-content-between"
                style={{ flex: 1 }}
              >
                <h5 className="card-title">{communityItem.name}</h5>
                <p className="card-text">
                  Language:{" "}
                  {communityItem.language
                    .split(", ")
                    .map(
                      (lang) => lang.charAt(0).toUpperCase() + lang.slice(1)
                    )
                    .join(", ")}{" "}
                  <br />
                  Area: {communityItem.area} <br />
                  Member Count: {communityItem.member_count} <br />
                  Type:{" "}
                  {communityItem.type.charAt(0).toUpperCase() +
                    communityItem.type.slice(1)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Improved Pagination Bar */}
      <nav className="mt-4">
        <ul className="pagination pagination-sm justify-content-center d-flex flex-wrap gap-1 overflow-auto">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link px-3"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ boxShadow: "none", outline: "none" }}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link px-3"
                onClick={() => paginate(index + 1)}
                style={{ boxShadow: "none", outline: "none" }}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
          >
            <button
              className="page-link px-3"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{ boxShadow: "none", outline: "none" }}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CommunitiesPage;
