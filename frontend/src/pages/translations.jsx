import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from 'react';
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

  return parts.map((part, index) => {
    const matchFound = subqueries.some(subquery => part.toLowerCase() === subquery);

    return matchFound ? (
      <span key={index} className="highlight">{part}</span> // Wrap matches in <span>
    ) : (
      part // Leave other text as is
    )
  });
};

const TranslationPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [query, setQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(12);

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
    Instances.sortServices("", false);
    Instances.sortServices(newValue.split(",")[0], newValue.split(",")[1] === "r");
    Instances.translations = Instances.getLangFiltered(Instances.translations, newFilterValue);
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

  if (!loaded) return <div><div className="spinner-border text-dark" role="status"></div></div>;

  // Filtering services based on search input
  const filteredTranslations = (() => {
    if (query.trim() === "") return Instances.translations;

    const searchTerms = query.toLowerCase().split(" ").filter(term => term);
    const queryPhrase = query.toLowerCase();

    return Instances.translations
      .map(translation => {
        let score = 0;
        const { name, descr, language, area } = translation;
        const text = `${name} ${descr} ${language} ${area}`.toLowerCase();

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

        return { translation, score };
      })
      .filter(({ score }) => score > 0) 
      .sort((a, b) => b.score - a.score) 
      .map(({ translation }) => ({
        ...translation,
        originalName: translation.name,
        name: highlightText(translation.name, query),
        area: highlightText(translation.area, query),
        language: translation.language
          .split(", ")
          .map(lang => highlightText(capitalizeFirstLetter(lang), query))
          .reduce((acc, curr) => acc.length ? [acc, ", ", curr] : [curr], []), // Preserve comma format
      }));
  })();

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTranslations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredTranslations.length / itemsPerPage);

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
    <div className="container mt-4">
      <br/>
      <h1 className="text-center mb-4">Multilingual Services in Austin</h1>
      <p className="mb-4">Number of services: {filteredTranslations.length}</p>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search services..."
        style={{ backgroundColor: "#e9713a", color: "#fff", borderRadius: "5px", padding: "8px", border: "none" }}
      />

      <div className="d-flex justify-content-center gap-3 my-3">
        {/* Sort Dropdown */}
        <select 
          className="form-select" 
          value={selectedValue} 
          onChange={handleChange} 
          style={{ backgroundColor: '#e9713a', color: '#fff' }}
        >
          <option value="">Sort ⇅</option>
          <option value="name,a">Name ↑</option>
          <option value="name,r">Name ↓</option>
          <option value="rating,a">Rating ↑</option>
          <option value="rating,r">Rating ↓</option>
          <option value="area,a">Area ↑</option>
          <option value="area,r">Area ↓</option>
          <option value="price,a">Price ↑</option>
          <option value="price,r">Price ↓</option>
        </select>

        {/* Language Filter Dropdown */}
        <select 
          className="form-select" 
          value={selectedFilterValue} 
          onChange={handleFilterChange} 
          style={{ backgroundColor: '#e9713a', color: '#fff' }}
        >
          <option value="">Language</option>
          <option value="spanish">Spanish</option>
          <option value="chinese">Chinese</option>
          <option value="vietnamese">Vietnamese</option>
          <option value="korean">Korean</option>
          <option value="french">French</option>
          <option value="german">German</option>
        </select>
      </div>

      {/* Items Per Page */}
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

      {/* Display the filtered items */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 justify-content-center">
        {currentItems.length === 0 ? (
          <div>No results</div>
        ) : (
          currentItems.map((service, index) => (
            <ServiceCard key={index} service={service}></ServiceCard>
          ))
        )}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination pagination-sm justify-content-center d-flex flex-wrap gap-1 overflow-auto">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link px-3"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button
                className="page-link px-3"
                onClick={() => paginate(index + 1)}
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
