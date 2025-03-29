import React, { useState } from "react";
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

  // Filter results based on the search query
  const filteredResults = allItems.filter((item) => {
    if (!item.name || typeof item.name !== "string") return false;
    return item.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase());
  });

  // Categorize results
  const categorizedResults = {
    Communities: filteredResults.filter((item) => item.type === "Community"),
    Jobs: filteredResults.filter((item) => item.type === "Job"),
    Services: filteredResults.filter((item) => item.type === "Service"),
  };

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

      {/* Render filtered results in columns */}
      {filteredResults.length > 0 ? (
        <div className="row">
          {/* Community Column */}
          {categorizedResults.Communities.length > 0 && (
            <div className="col-md-4">
              <h3>Communities</h3>
              <div className="list-group">
                {categorizedResults.Communities.map((item, index) => (
                  <div key={index} className="list-group-item">
                    <h5>{item.name}</h5>
                    <Link to={`/communities/${item.id}`} className="btn btn-primary">
                      View Community
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Jobs Column */}
          {categorizedResults.Jobs.length > 0 && (
            <div className="col-md-4">
              <h3>Jobs</h3>
              <div className="list-group">
                {categorizedResults.Jobs.map((item, index) => (
                  <div key={index} className="list-group-item">
                    <h5>{item.name}</h5>
                    <Link 
                        to={`/${
                          item.type === "Community" ? "communities" : item.type.toLowerCase() + "s"
                        }/${encodeURIComponent(item.name)}`} 
                        className="btn btn-primary"
                      >
                      View Job
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Column */}
          {categorizedResults.Services.length > 0 && (
            <div className="col-md-4">
              <h3>Services</h3>
              <div className="list-group">
                {categorizedResults.Services.map((item, index) => (
                  <div key={index} className="list-group-item">
                    <h5>{item.name}</h5>
                    <Link 
                        to={`/${
                          item.type === "Community" ? "communities" : "translations"
                        }/${encodeURIComponent(item.name)}`} 
                        className="btn btn-primary"
                      >
                      View Service
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchPage;