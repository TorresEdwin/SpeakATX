import React, { useState } from "react";
import { Link } from "react-router-dom";
import Instances from "./instances"; // Import central data source
import CommunityCard from "./community_card";
import JobCard from "./job_card";
import ServiceCard from "./service_card";
import SpeechBubbleBackground from "../components/Bubble";


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
  
    console.log(parts);
  
    return parts.map((part, index) => {
      const matchFound = subqueries.some(subquery => part.toLowerCase() === subquery);
  
      return matchFound ? (
        <span key={index} className="highlight">{part}</span> // Wrap matches in <span>
      ) : (
        part // Leave other text as is
      )
    });
  };

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
      item.title,
      item.type,
      item.pay
    ]
      .filter(Boolean)
      .map(field => field.toString().toLowerCase());

    let score = 0;

    // Exact phrase match (highest relevance)
    if (fields.some(field => field.includes(query))) {
      score += 10;
    }

    // Multi-word match (medium relevance)
    const multiWordMatches = queryWords.filter(word =>
      fields.some(field => field.includes(word))
    ).length;
    score += multiWordMatches * 3;

    // Single-word starts-with match (lower relevance)
    const singleWordMatches = queryWords.filter(word =>
      fields.some(field => field.split(" ").some(w => w.startsWith(word)))
    ).length;
    score += singleWordMatches;

    // Title match gets extra weight
    if (item.name?.toLowerCase().includes(query)) score += 5;

    return score;
  };

  // Filter and sort results by relevance
  const filteredResults = allItems
    .map(item => {
      const relevance = getRelevanceScore(item);
      if (item.type === "Job") {
        return {
          ...item,
          relevance,
          originalName: item.name,
          name: highlightText(item.name, query),
          title: highlightText(item.title || "", query),
          area: highlightText(item.area || "", query),
          language: item.language
            ? item.language.split(", ").map(lang => highlightText(capitalizeFirstLetter(lang), query)).reduce((acc, curr) => acc.length ? [acc, ", ", curr] : [curr], [])
            : "",
        };
      } else if (item.type === "Service") {
        return {
          ...item,
          relevance,
          originalName: item.name,
          name: highlightText(item.name, query),
          area: highlightText(item.area || "", query),
          language: item.language
            ? item.language.split(", ").map(lang => highlightText(capitalizeFirstLetter(lang), query)).reduce((acc, curr) => acc.length ? [acc, ", ", curr] : [curr], [])
            : "",
        };
      } else if (item.type === "Community") {
        return {
          ...item,
          relevance,
          originalName: item.name,
          name: highlightText(item.name, query),
          area: highlightText(item.area || "", query),
          language: item.language
            ? item.language.split(", ").map(lang => highlightText(capitalizeFirstLetter(lang), query)).reduce((acc, curr) => acc.length ? [acc, ", ", curr] : [curr], [])
            : "",
          type: highlightText(capitalizeFirstLetter(item.type), query),
        };
      }

      // Default case if type is missing or unknown
      return { ...item, relevance };
    })
    .filter(item => item.relevance > 0) // Remove items with no match
    .sort((a, b) => b.relevance - a.relevance); // Sort by highest relevance

  const categorizedResults = {
    Communities: filteredResults.filter((item) => item.type === "Community"),
    Jobs: filteredResults.filter((item) => item.type === "Job"),
    Services: filteredResults.filter((item) => item.type === "Service"),
  };
  

  return (
    <>
    <div className="search-page-wrapper">
    <div className="container my-4">
      {!query && <SpeechBubbleBackground />}

      <div className="search-header">
      <h1 className="mb-4">Search the Website</h1>

      <input
        type="text"
        className="search-input form-control mb-4"
        placeholder="Search for communities, jobs, or services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>


      {/* Communities */}
      {categorizedResults.Communities.length > 0 && (
        <>
          <h2 className="mb-3">Communities</h2>
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
          <h2 className="mb-3">Jobs</h2>
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
          <h2 className="mb-3">Services</h2>
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
      {query && filteredResults.length === 0 && <p>No results found</p>}
      </div>
      </div>
      </>
  );
};

export default SearchPage;
