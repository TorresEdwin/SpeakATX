import React from "react";

const SearchBar = ({ query, setQuery, setCurrentPage }) => {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
      }}
    />
  );
};

export default SearchBar;
