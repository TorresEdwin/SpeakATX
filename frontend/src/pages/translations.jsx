import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from 'react';
import JobCard from "./job_card.jsx";
import ServiceCard from "./service_card.jsx";
import CommunityCard from "./community_card.jsx";
import SearchBar from "../components/Searchbar/index.jsx";

const TranslationPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [query, setQuery] = useState("");
  const itemsPerPage = 8; // Items per page

  useEffect(() => {
    const checkLoadedStatus = () => {
      setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
    };

    const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms

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
    if (query.trim() === "") return Instances.translations; // Show all if query is empty
  
    const searchTerms = query.toLowerCase().split(" ").filter(term => term);
  
    // Check if theres a language term
    const languageTerms = searchTerms.filter(term => Instances.translations.some(translation =>
      translation.language.toLowerCase().includes(term)
    ));
  
    // if theres a language, filter communities by language first
    let filteredByLanguage = Instances.translations;
    if (languageTerms.length > 0) {
      filteredByLanguage = Instances.translations.filter(translation =>
        languageTerms.some(term => translation.language.toLowerCase().includes(term))
      );
    }
  
    //apply the remaining search terms
    const remainingSearchTerms = searchTerms.filter(term => !languageTerms.includes(term));
  
    //no remaining terms are left
    if (remainingSearchTerms.length === 0) {
      return filteredByLanguage;
    }
  
    //remaining search terms to the already filtered communities
    return filteredByLanguage.filter(translation =>
      remainingSearchTerms.some(term =>
        translation.name.toLowerCase().includes(term) ||
        translation.descr.toLowerCase().includes(term) ||
        translation.language.toLowerCase().includes(term) ||
        translation.location?.display_address?.join(", ").toLowerCase().includes(term)
      )
    );
  })();

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = Instances.translations.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = filteredTranslations.slice(indexOfFirstItem, indexOfLastItem);


  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredTranslations.length / itemsPerPage);

  // Change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Define a placeholder image for missing thumbnails
  const placeholderImage = "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png";

  return (
    <div className="container mt-4">
      <br />
      <h1 className="text-center mb-4">Multilingual Services in Austin</h1>
      <p className="mb-4">Number of services: {Instances.translations.length}</p>
      <SearchBar query={query} setQuery={setQuery} setCurrentPage={setCurrentPage} />

      <select value={selectedValue} onChange={handleChange}>
        <option value="">Sort</option>
        <option value="name,a">Name (^)</option>
        <option value="name,r">Name (v)</option>
        <option value="rating,a">Rating (^)</option>
        <option value="rating,r">Rating (v)</option>
        <option value="area,a">Area (^)</option>
        <option value="area,r">Area (v)</option>
        <option value="price,a">Price (^)</option>
        <option value="price,r">Price (v)</option>
      </select>
      <br/>
      <br/>
      <select value={selectedFilterValue} onChange={handleFilterChange}>
        <option value="">Language</option>
        <option value="spanish">Spanish</option>
        <option value="chinese">Chinese</option>
        <option value="vietnamese">Vietnamese</option>
        <option value="korean">Korean</option>
        <option value="french">French</option>
        <option value="german">German</option>
      </select>
      <br />
      <br />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 justify-content-center">
      {currentItems.length === 0 ? (
          <div>No results</div>
          ) : (
          currentItems.map((service, index) => (
          <ServiceCard key={index} service={service}></ServiceCard>
        ))
        )}
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
