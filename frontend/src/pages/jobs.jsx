// Filename - pages/about.js

import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";

const JobsPage = () => {
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

    if (!loaded) return <div><div className="spinner-border text-dark" role="status"></div></div>;

    // Get the list of jobs
    const jobLinks = Instances.jobs;

    // Calculate the index of the first and last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = jobLinks.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages
    const totalPages = Math.ceil(jobLinks.length / itemsPerPage);

    // Function to change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container my-4">
            <br />
            <h1 className="mb-4">Jobs in Austin</h1>
            <p className="mb-4">Number of jobs: {jobLinks.length}</p>

            <div className="row justify-content-center">
                {currentItems.map((jobItem, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                        <Link 
                            to={`/jobs/${jobItem.name}`}  // Links to dynamic job page
                            className="card text-decoration-none d-flex flex-column justify-content-between"
                            style={{ height: '500px' }} // Increased card height
                        >
                            <img 
                                src={jobItem.imageUrl} 
                                alt={jobItem.name} 
                                className="card-img-top" 
                                style={{ height: "250px", objectFit: "cover" }} // Increased image height
                            />
                            <div className="card-body d-flex flex-column justify-content-between" style={{ flex: 1 }}>
                                <h5 className="card-title">{jobItem.name}</h5>
                                <p className="card-text">
                                    {jobItem.title} <br />
                                    Pay: ${jobItem.pay}/hr <br />
                                    Language: {jobItem.language.split(", ").map(lang => lang.charAt(0).toUpperCase() + lang.slice(1)).join(", ")} <br />
                                    Area: {jobItem.area}
                                </p>
                            </div>
                        </Link>
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

export default JobsPage;
