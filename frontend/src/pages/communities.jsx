import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import JobCard from "./job_card.jsx";
import ServiceCard from "./service_card.jsx";
import CommunityCard from "./community_card.jsx";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/Searchbar/index.jsx";


const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Highlight function: splits the text using a capturing regex and wraps matching parts in <span>
const highlightText = (text, query) => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);  // Split the text around the query match

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="highlight">{part}</span> // Wrap matches in <span>
    ) : (
      part // Leave other text as is
    )
  );
};

const CommunitiesPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFilterValue, setSelectedFilterValue] = useState('');

  useEffect(() => {
    const checkLoadedStatus = () => {
      setLoaded(Instances.loaded); // Update when Instances.loaded changes
    };

    const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms

    // Get the current page from URL query parameters if available
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page');

    if (page && !isNaN(page)) {
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }

    return () => clearInterval(intervalId);
  }, []);

  // Handle sort/filter dropdown changes
  const onDropdownChange = (newValue, newFilterValue) => {
    Instances.sortCommunities("", false);
    Instances.sortCommunities(newValue.split(",")[0], newValue.split(",")[1] === "r");
    Instances.communities = Instances.getLangFiltered(Instances.communities, newFilterValue);
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

  // Filter communities based on the search query with a scoring system
  const filteredCommunities = (() => {
    if (query.trim() === "") return Instances.communities;

    const searchTerms = query.toLowerCase().split(" ").filter(term => term);
    const queryPhrase = query.toLowerCase();

    return Instances.communities
      .map(community => {
        let score = 0;
        const { name, descr, language, area, type } = community;
        const text = `${name} ${descr} ${language} ${area} ${type}`.toLowerCase();

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

        return { community, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ community }) => ({
        ...community,
        originalName: community.name, // Preserve the original name
        name: highlightText(community.name, query),
        area: highlightText(community.area, query),
        language: community.language
            .split(", ")
            .map(lang => highlightText(capitalizeFirstLetter(lang), query))
            .reduce((acc, curr) => acc.length ? [acc, ", ", curr] : [curr], []), // Preserve comma format
        type: highlightText(capitalizeFirstLetter(community.type), query),
    }));
  })();

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCommunities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);

  // Function to change page and update URL without reloading
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.history.pushState(null, '', `?page=${pageNumber}`);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page change
  };

  return (
    <div className="container my-4">
      <br />
      <h1 className="mb-4">Communities in Austin</h1>
      <p className="mb-4">Number of communities: {filteredCommunities.length}</p>


      <SearchBar query={query} setQuery={setQuery} setCurrentPage={setCurrentPage} />

      <div className="flex items-center gap-4 flex-wrap">
        <select
          value={selectedValue}
          onChange={handleChange}
          className="border p-2 rounded m-2 md:m-4"
        >
          <option value="">Sort</option>
          <option value="name,a">Name (^)</option>
          <option value="name,r">Name (v)</option>
          <option value="count,a">Member Count (^)</option>
          <option value="count,r">Member Count (v)</option>
          <option value="area,a">Area (^)</option>
          <option value="area,r">Area (v)</option>
          <option value="type,a">Type (^)</option>
          <option value="type,r">Type (v)</option>
        </select>

        <select
          value={selectedFilterValue}
          onChange={handleFilterChange}
          className="border p-2 rounded m-2 md:m-4"
        >
          <option value="">Language</option>
          <option value="spanish">Spanish</option>
          <option value="chinese">Chinese</option>
          <option value="vietnamese">Vietnamese</option>
          <option value="korean">Korean</option>
          <option value="french">French</option>
          <option value="german">German</option>
        </select>

        <label className="flex items-center gap-2 m-2 md:m-4">
          Items per page: <span>{itemsPerPage}</span>
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
          currentItems.map((communityItem, index) => (
            <CommunityCard key={index} communityItem={communityItem} />
          ))
        )}
      </div>


      {/* Pagination Bar */}
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

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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