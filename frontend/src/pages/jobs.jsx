import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from "react";
import JobCard from "./job_card.jsx";
import ServiceCard from "./service_card.jsx";
import CommunityCard from "./community_card.jsx";
import SearchBar from "../components/Searchbar/index.jsx";


const placeholderImage =
  "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png";

const JobsPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [query, setQuery] = useState("");
  const itemsPerPage = 8; // Number of items per page

  useEffect(() => {
    const checkLoadedStatus = () => {
      setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
    };

    const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms

    return () => clearInterval(intervalId);
  }, []);

  const [selectedValue, setSelectedValue] = useState('');

  const onDropdownChange = (newValue) => {
    console.log("Dropdown value changed to:", newValue);
    Instances.sortJobs(newValue.split(",")[0], newValue.split(",")[1] === "r");
  };

  // Handle change event
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onDropdownChange(newValue);
  };

  if (!loaded)
    return (
      <div>
        <div className="spinner-border text-dark" role="status"></div>
      </div>
    );

  // Get the list of jobs
  const jobLinks = Instances.jobs;

  // Filtering jobs based on search input
  const filteredJobs = Instances.jobs.filter((community) =>
    community.name.toLowerCase().includes(query.toLowerCase())
  );

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = jobLinks.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);


  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4">
      <br />
      <h1 className="mb-4">Jobs in Austin</h1>
      <p className="mb-4">Number of jobs: {jobLinks.length}</p>

      <SearchBar query={query} setQuery={setQuery} setCurrentPage={setCurrentPage} />
      <select value={selectedValue} onChange={handleChange}>
        <option value="">Sort</option>
        <option value="name,a">Name (^)</option>
        <option value="name,r">Name (v)</option>
        <option value="title,a">Title (^)</option>
        <option value="title,r">Title (v)</option>
        <option value="language,a">Language (^)</option>
        <option value="language,r">Language (v)</option>
        <option value="area,a">Area (^)</option>
        <option value="area,r">Area (v)</option>
        <option value="pay,a">Pay (^)</option>
        <option value="pay,r">Pay (v)</option>
      </select>
      <br/>
      <br/>
      <div className="row justify-content-center">
        {currentItems.map((jobItem, index) => (
          <JobCard
            jobItem={jobItem}
          ></JobCard>
        ))}
      </div>

      {/*Improved Pagination Bar */}
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

export default JobsPage;
