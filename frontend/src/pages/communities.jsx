import "bootstrap/dist/css/bootstrap.min.css";
import Instances from "./instances.jsx";
import CommunityCard from "./community_card.jsx";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/Searchbar/index.jsx";

const CommunitiesPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const intervalId = setInterval(() => setLoaded(Instances.loaded), 500);
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
    setSelectedValue(event.target.value);
    onDropdownChange(event.target.value, selectedFilterValue);
  };

  const handleFilterChange = (event) => {
    setSelectedFilterValue(event.target.value);
    onDropdownChange(selectedValue, event.target.value);
  };

  if (!loaded) {
    return <div className="text-center"><div className="spinner-border text-dark" role="status"></div></div>;
  }

  const filteredCommunities = query.trim()
    ? Instances.communities.filter(community =>
        [community.name, community.descr, community.language, community.area, community.type]
          .some(field => field.toLowerCase().includes(query.toLowerCase()))
      )
    : Instances.communities;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCommunities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-4">
      {/* White box outside of content */}
      <div 
        style={{
          position: "absolute", 
          top: "337px",  // Adjust top position
          height: "1070px",
          left: "16%",  // Center box
          right: "16%",  // Control width
          backgroundColor: "rgba(255, 255, 255, 0.8)", 
          borderRadius: "10px", 
          zIndex: 0,
          padding: "20px",
        }}
      />

      <div 
        style={{
          position: "absolute", 
          top: "185px",  // Adjust top position
          height: "135px",
          left: "16%",  // Center box
          right: "16%",  // Control width
          backgroundColor: "rgba(255, 255, 255, 0.8)", 
          borderRadius: "10px", 
          zIndex: 0,
          padding: "20px",
        }}
      />

      <div className="p-4 rounded" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="mb-3 text-center">Communities in Austin</h1>
        <p className="mb-3 text-center">Number of communities: {filteredCommunities.length}</p>

        <br />

      <input
        type="text"
        className="form-control"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Search communities..."
        style={{ backgroundColor: "#e9713a", color: "#fff", borderRadius: "5px", padding: "8px", border: "none", carpetColor: "#fff" }}
      />


        <div className="d-flex justify-content-center gap-3 my-3">
          <select 
            className="form-select" 
            value={selectedValue} 
            onChange={handleChange} 
            style={{ backgroundColor: '#e9713a', color: '#fff' }} // Apply orange background with white text
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
            className="form-select" 
            value={selectedFilterValue} 
            onChange={handleFilterChange} 
            style={{ backgroundColor: '#e9713a', color: '#fff' }} // Apply orange background with white text
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

        <br />
        <br />

        <div className="row justify-content-center">
          {currentItems.length === 0 ? (
            <div className="text-center">No results</div>
          ) : (
            currentItems.map((communityItem, index) => (
              <CommunityCard key={index} communityItem={communityItem} />
            ))
          )}
        </div>

        <nav className="mt-4">
          <ul className="pagination pagination-sm justify-content-center d-flex flex-wrap gap-1 overflow-auto">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link px-3" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link px-3" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link px-3" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CommunitiesPage;