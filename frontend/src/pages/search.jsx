import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Instances from "./instances"; // Import central data source

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Combine all items from different models into one array safely
  const allItems = [
    ...(Instances?.communities?.map((item) => ({ ...item, type: "Community" })) || []),
    ...(Instances?.jobs?.map((item) => ({ ...item, type: "Job" })) || []),
    ...(Instances?.translations?.map((item) => ({ ...item, type: "Service" })) || []),
  ];

  /*console.log("Search Query:", searchQuery);
  console.log("All Items:", allItems);
  console.log("Does 'Legacy Restoration' exist?", allItems.some(item => item.name === "Legacy Restoration"));
  console.log("Instances.jobs:", Instances.jobs);*/

  const filteredResults = allItems.filter((item) => {
    if (!item.name || typeof item.name !== "string") return false;
    const itemName = item.name.trim().toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    return itemName.includes(query);
  });

  /*useEffect(() => {
    //console.log("Filtered Results at render:", filteredResults.map(item => item.name));
  }, [filteredResults]);
  console.log("Is 'Legacy Restoration' in Filtered Results?", filteredResults.some(item => item.name === "Legacy Restoration")); */


  return (
    <div className="container my-4">
      <h1 className="mb-4">Search the Website</h1>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search for communities, jobs, or services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Render filtered results */}
      {filteredResults.length > 0 ? (
        <div className="list-group">
          {filteredResults.map((item, index) => (
            <div key={index} className="list-group-item">
              <h5>{item.name}</h5>
              <p>Type: {item.type}</p>
              <Link to={`/${item.type.toLowerCase()}/${item.id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchPage;