import React, { useState } from "react";
import { Link } from "react-router-dom";
import Instances from "./instances"; // Import central data source
import CommunityCard from "./community_card";
import JobCard from "./job_card";
import ServiceCard from "./service_card";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const allItems = [
    ...(Instances?.communities?.map((item) => ({ ...item, type: "Community" })) || []),
    ...(Instances?.jobs?.map((item) => ({ ...item, type: "Job" })) || []),
    ...(Instances?.translations?.map((item) => ({ ...item, type: "Service" })) || []),
  ];

  const query = searchQuery.trim().toLowerCase();
  const queryWords = query.split(/\s+/);

  const getRelevanceScore = (item) => {
    if (!query) return 0;
    const fields = [
      item.name,
      item.descr,
      item.language,
      item.area,
      item.count,
      item.title,
      item.pay,
    ]
      .filter(Boolean)
      .map((field) => field.toString().toLowerCase());

    let score = 0;
    if (fields.some((field) => field.includes(query))) score += 10;
    const wordMatches = queryWords.filter((word) =>
      fields.some((field) => field.includes(word))
    );
    score += wordMatches.length * 3;
    if (item.name?.toLowerCase().includes(query)) score += 5;

    return score;
  };

  const filteredResults = allItems
    .map((item) => ({ ...item, relevance: getRelevanceScore(item) }))
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);

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

      {/* Communities */}
      {categorizedResults.Communities.length > 0 && (
        <>
          <h3 className="mb-3">Communities</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-4">
            {categorizedResults.Communities.map((communityItem, index) => (
              <CommunityCard
                key={index}
                communityItem={communityItem}
                compact={true}
              />
            ))}
          </div>
        </>
      )}

      {/* Jobs */}
      {categorizedResults.Jobs.length > 0 && (
        <>
          <h3 className="mb-3">Jobs</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-4">
            {categorizedResults.Jobs.map((jobItem, index) => (
              <JobCard
                key={index}
                jobItem={jobItem}
                compact={true}
              />
            ))}
          </div>
        </>
      )}

      {/* Services */}
      {categorizedResults.Services.length > 0 && (
        <>
          <h3 className="mb-3">Services</h3>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mb-4">
            {categorizedResults.Services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                compact={true}
              />
            ))}
          </div>
        </>
      )}

      {/* No results fallback */}
      {filteredResults.length === 0 && <p>No results found</p>}
    </div>
  );
};

export default SearchPage;
