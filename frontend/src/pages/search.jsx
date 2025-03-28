import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Instances from "./instances"; // Import central data source

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Combine all items from different models into one array safely
  const allItems = [
    ...(Instances?.communities?.map((item) => ({ ...item, type: "Community" })) || []),
    ...(Instances?.jobs?.map((item) => ({ ...item, type: "Job" })) || []),
    ...(Instances?.services?.map((item) => ({ ...item, type: "Service" })) || []),
  ];

  console.log("Search Query:", searchQuery);
  console.log("All Items:", allItems);
  console.log("Does 'Legacy Restoration' exist?", allItems.some(item => item.name === "Legacy Restoration"));
  console.log("Instances.jobs:", Instances.jobs);

  // Filter based on search query (case-insensitive)
  /*const filteredResults = allItems.filter((item) => {
    if (!item.name || typeof item.name !== "string") return false; // Ensure valid name
    const matches = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (matches) {
      console.log("Match Found:", item);
    }
    return matches;
  });*/

  const filteredResults = allItems.filter((item) => {
    if (!item.name || typeof item.name !== "string") return false;
    const itemName = item.name.trim().toLowerCase();
    const query = searchQuery.trim().toLowerCase();
    return itemName.includes(query);
  });

  useEffect(() => {
    console.log("Filtered Results at render:", filteredResults.map(item => item.name));
  }, [filteredResults]);
  console.log("Is 'Legacy Restoration' in Filtered Results?", filteredResults.some(item => item.name === "Legacy Restoration"));


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

      {/* Display Search Results */}
      {searchQuery && (
        <div className="row">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => {
              console.log("Rendering Item:", item);
              return (
                <div key={item.name} className="col-md-4 mb-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        <strong>Category:</strong> {item.type}
                      </p>
                      <Link 
                        to={`/${
                          item.type === "Community" ? "communities" : item.type.toLowerCase() + "s"
                        }/${encodeURIComponent(item.name)}`} 
                        className="btn btn-primary"
                      >
                        View {item.type}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center">No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;