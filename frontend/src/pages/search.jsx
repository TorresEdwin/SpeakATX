import React, { useState } from "react";
import { Link } from "react-router-dom";
import Instances from "./instances"; // Import central data source
import CommunityCard from "./community_card";
import JobCard from "./job_card";
import ServiceCard from "./service_card";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Combine all items from different models into one array safely
  const allItems = [
    ...(Instances?.communities?.map((item) => ({ ...item, type: "Community" })) || []),
    ...(Instances?.jobs?.map((item) => ({ ...item, type: "Job" })) || []),
    ...(Instances?.translations?.map((item) => ({ ...item, type: "Service" })) || []),
  ];

  // Normalize search query
  const query = searchQuery.trim().toLowerCase();
  const queryWords = query.split(/\s+/); // Split input into words

  // Function to calculate relevance score
  const getRelevanceScore = (item) => {
    if (!query) return 0; // No query, no match

    const fields = [
      item.name, 
      item.descr, 
      item.language, 
      item.area, 
      item.count, 
      item.title, 
      item.pay
    ].filter(Boolean).map(field => field.toString().toLowerCase());

    let score = 0;

    // Exact phrase match → Highest relevance
    if (fields.some(field => field.includes(query))) score += 10;

    // Multiple word matches → Higher relevance
    const wordMatches = queryWords.filter(word => fields.some(field => field.includes(word)));
    score += wordMatches.length * 3;

    // Title match gets extra weight
    if (item.name?.toLowerCase().includes(query)) score += 5;

    return score;
  };

  // Filter and sort results by relevance
  const filteredResults = allItems
    .map(item => ({ ...item, relevance: getRelevanceScore(item) }))
    .filter(item => item.relevance > 0) // Remove items with no match
    .sort((a, b) => b.relevance - a.relevance); // Sort by highest relevance

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
              {categorizedResults.Communities.map((communityItem, index) => (
                <CommunityCard key={index} communityItem={communityItem} />
              ))}
            </div>
          )}

          {/* Jobs Column */}
          {categorizedResults.Jobs.length > 0 && (
            <div className="col-md-4">
              <h3>Jobs</h3>
              {categorizedResults.Jobs.map((jobItem, index) => (
                <JobCard key={index} jobItem={jobItem} />
              ))}
            </div>
          )}

          {/* Services Column */}
          {categorizedResults.Services.length > 0 && (
            <div className="col-md-4">
              <h3>Services</h3>
              {categorizedResults.Services.map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
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
