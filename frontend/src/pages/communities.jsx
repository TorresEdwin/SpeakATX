import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Instances from "./instances.jsx";
import JobCard from "./job_card.jsx";
import ServiceCard from "./service_card.jsx";
import CommunityCard from "./community_card.jsx";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/Searchbar/index.jsx";

const CommunitiesPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 8; // Number of items per page



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

  const communityLinks = Instances.communities;

  // Filtering communities based on search input
  const filteredCommunities = (() => {
    if (query.trim() === "") return Instances.communities; // Show all if query is empty
  
    const searchTerms = query.toLowerCase().split(" ").filter(term => term);
    const queryPhrase = query.toLowerCase(); // Store full query for phrase matching

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

        return { community, score };
      })
      .filter(({ score }) => score > 0) 
      .sort((a, b) => b.score - a.score)
      .map(({ community }) => community);
})();

  // const filteredCommunities = (() => {
  //   if (query.trim() === "") return Instances.communities; // Show all if query is empty
  
  //   const searchTerms = query.toLowerCase().split(" ").filter(term => term);
  
  //   // Check if theres a language term
  //   const languageTerms = searchTerms.filter(term => Instances.communities.some(community =>
  //     community.language.toLowerCase().includes(term)
  //   ));
  
  //   // if theres a language, filter communities by language first
  //   let filteredByLanguage = Instances.communities;
  //   if (languageTerms.length > 0) {
  //     filteredByLanguage = Instances.communities.filter(community =>
  //       languageTerms.some(term => community.language.toLowerCase().includes(term))
  //     );
  //   }
  
  //   //apply the remaining search terms
  //   const remainingSearchTerms = searchTerms.filter(term => !languageTerms.includes(term));
  
  //   //no remaining terms are left
  //   if (remainingSearchTerms.length === 0) {
  //     return filteredByLanguage;
  //   }
  
  //   //remaining search terms to the already filtered communities
  //   return filteredByLanguage.filter(community =>
  //     remainingSearchTerms.some(term =>
  //       community.name.toLowerCase().includes(term) ||
  //       community.descr.toLowerCase().includes(term) ||
  //       community.language.toLowerCase().includes(term) ||
  //       community.area.toLowerCase().includes(term) ||
  //       community.type.toLowerCase().includes(term)
  //     )
  //   );
  // })();
  


  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = communityLinks.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = filteredCommunities.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4">
      <br />
      <h1 className="mb-4">Communities in Austin</h1>
      <p className="mb-4">Number of communities: {filteredCommunities.length}</p>

      <SearchBar query={query} setQuery={setQuery} setCurrentPage={setCurrentPage} />

      <select value={selectedValue} onChange={handleChange}>
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
      <br />
      <br />
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
      <div className="row justify-content-center">
      {currentItems.length === 0 ? (
          <div>No results</div>
          ) : (
          currentItems.map((communityItem, index) => (
            <CommunityCard key={index} communityItem={communityItem} />
          ))
        )}
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
