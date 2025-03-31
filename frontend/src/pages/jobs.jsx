import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from "react";
import JobCard from "./job_card.jsx";
import ServiceCard from "./service_card.jsx";
import CommunityCard from "./community_card.jsx";
import SearchBar from "../components/Searchbar/index.jsx";

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Highlight function: splits the text using a capturing regex and wraps matching parts in <span>
const highlightText = (text, query) => {
  if (!query.trim()) return text;

  const subqueries = query.toLowerCase().trim().split(" ");

  const regexes = subqueries.map(subquery => new RegExp(`(${subquery})`, 'gi'));

  let parts = [text];
  
  regexes.forEach(regex => {
    parts = parts.flatMap(part => part.split(regex));
  });

  console.log(parts);

  return parts.map((part, index) => {
    const matchFound = subqueries.some(subquery => part.toLowerCase() === subquery);

    return matchFound ? (
      <span key={index} className="highlight">{part}</span> // Wrap matches in <span>
    ) : (
      part // Leave other text as is
    )
  });
};

const JobsPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [query, setQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const checkLoadedStatus = () => {
      setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
    };

    const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms

    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page');

    // If the `page` query parameter exists and is a valid number, set it as the current page
    if (page && !isNaN(page)) {
      setCurrentPage(Number(page));
    } else {
      // Fallback to 1 if the `page` query parameter is invalid or doesn't exist
      setCurrentPage(1);
    }

    return () => clearInterval(intervalId);
  }, []);

  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFilterValue, setSelectedFilterValue] = useState('');

  const onDropdownChange = (newValue, newFilterValue) => {
    Instances.sortJobs("", false);
    Instances.sortJobs(newValue.split(",")[0], newValue.split(",")[1] === "r");
    Instances.jobs = Instances.getLangFiltered(Instances.jobs, newFilterValue);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onDropdownChange(newValue, selectedFilterValue);
  };

  const handleFilterChange = (event) => {
    const newFilterValue = event.target.value;
    setSelectedFilterValue(newFilterValue);
    onDropdownChange(selectedValue, newFilterValue);
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
  const filteredJobs = (() => {
    if (query.trim() === "") return Instances.jobs; // Show all if query is empty
  
    const searchTerms = query.toLowerCase().split(" ").filter(term => term);
    const queryPhrase = query.toLowerCase(); // Store full query for phrase matching

    return Instances.jobs
      .map(job => {
        let score = 0;
        const { name, descr, language, area, title } = job;
        const text = `${name} ${descr} ${language} ${area} ${title}`.toLowerCase();

        // Exact phrase match (highest relevance)
        if (text.includes(queryPhrase)) {
          score += 10;
        }

        // Multi-word match (medium relevance)
        let multiWordMatches = searchTerms.filter(term => text.includes(term)).length;
        score += multiWordMatches * 3;

        // Single-word matches (lower relevance)
        let singleWordMatches = searchTerms.filter(term => 
          text.split(" ").some(word => word.startsWith(term))
        ).length;
        score += singleWordMatches;

         // Title match gets extra weight
         if (name?.toLowerCase().includes(query)) score += 5;

        return { job, score };
      })
      .filter(({ score }) => score > 0) 
      .sort((a, b) => b.score - a.score) 
      .map(({ job }) => ({
        ...job,
        originalName: job.name,
        name: highlightText(job.name, query),
        title: highlightText(job.title, query),
        area: highlightText(job.area, query),
        language: job.language
          .split(", ")
          .map(lang => highlightText(capitalizeFirstLetter(lang), query))
          .reduce((acc, curr) => acc.length ? [acc, ", ", curr] : [curr], []), // Preserve comma format
      }));
  })();

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = jobLinks.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);


  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  // Function to change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    // Update the current page state
    setCurrentPage(pageNumber);
  
    // Update the URL with the page number without reloading the page
    window.history.pushState(null, '', `?page=${pageNumber}`);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="container my-4">
      <br />
      <h1 className="mb-4">Jobs in Austin</h1>
      <p className="mb-4">Number of jobs: {filteredJobs.length}</p>

      <SearchBar query={query} setQuery={setQuery} setCurrentPage={setCurrentPage} className="border p-2 rounded m-2 md:m-4"/>

    <div className="flex items-center gap-4 flex-wrap ">
      <select value={selectedValue} onChange={handleChange} className="border p-2 rounded m-2 md:m-4">
        <option value="">Sort</option>
        <option value="name,a">Name (^)</option>
        <option value="name,r">Name (v)</option>
        <option value="title,a">Title (^)</option>
        <option value="title,r">Title (v)</option>
        <option value="area,a">Area (^)</option>
        <option value="area,r">Area (v)</option>
        <option value="pay,a">Pay (^)</option>
        <option value="pay,r">Pay (v)</option>
      </select>
      <select value={selectedFilterValue} onChange={handleFilterChange} className="border p-2 rounded m-2 md:m-4">
        <option value="">Language</option>
        <option value="spanish">Spanish</option>
        <option value="chinese">Chinese</option>
        <option value="vietnamese">Vietnamese</option>
        <option value="korean">Korean</option>
        <option value="french">French</option>
        <option value="german">German</option>
      </select>
      <label className="flex items-center gap-2 m-2 md:m-4">
        Items per page: {itemsPerPage}
        <input
          type="range"
          min="4"
          max="24"
          step="4"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="form-range ml-4"
        />
      </label>
      </div>
      <div className="row justify-content-center m-2 md:m-4">
      {currentItems.length === 0 ? (
          <div>No results</div>
          ) : (
          currentItems.map((jobItem, index) => (
            <JobCard key={index} jobItem={jobItem} />
          ))
        )}
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
