import "bootstrap/dist/css/bootstrap.min.css";
import Instances from "./instances.jsx";
import React, { useState, useEffect } from "react";
import JobCard from "./job_card.jsx";

const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const highlightText = (text, query) => {
  if (!query.trim()) return text;

  const subqueries = query.toLowerCase().trim().split(" ");
  const regexes = subqueries.map(subquery => new RegExp(`(${subquery})`, 'gi'));

  let parts = [text];
  regexes.forEach(regex => {
    parts = parts.flatMap(part => part.split(regex));
  });

  return parts.map((part, index) =>
    subqueries.includes(part.toLowerCase()) ? (
      <span key={index} className="highlight">{part}</span>
    ) : part
  );
};

const JobsPage = () => {
  const [loaded, setLoaded] = useState(Instances.loaded);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedFilterValue, setSelectedFilterValue] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => setLoaded(Instances.loaded), 500);

    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page');
    setCurrentPage(page && !isNaN(page) ? Number(page) : 1);

    return () => clearInterval(intervalId);
  }, []);

  const onDropdownChange = (newValue, newFilterValue) => {
    Instances.sortJobs("", false);
    Instances.sortJobs(newValue.split(",")[0], newValue.split(",")[1] === "r");
    Instances.jobs = Instances.getLangFiltered(Instances.jobs, newFilterValue);
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

  const filteredJobs = (() => {
    if (query.trim() === "") return Instances.jobs;

    const searchTerms = query.toLowerCase().split(" ").filter(term => term);
    const queryPhrase = query.toLowerCase();

    return Instances.jobs
      .map(job => {
        let score = 0;
        const { name, descr, language, area, title } = job;
        const text = `${name} ${descr} ${language} ${area} ${title}`.toLowerCase();

        if (text.includes(queryPhrase)) score += 10;
        score += searchTerms.filter(term => text.includes(term)).length * 3;
        score += searchTerms.filter(term => text.split(" ").some(word => word.startsWith(term))).length;
        if (name?.toLowerCase().includes(query)) score += 5;

        return { job, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ job }) => ({
        ...job,
        originalName: job.name,
        name: highlightText(job.name, query),
        title: highlightText(job.title, query),
        area: highlightText(job.area, query),
        language: job.language
          .split(", ")
          .map(lang => highlightText(capitalizeFirstLetter(lang), query))
          .reduce((acc, curr) => acc.length ? [acc, ", ", curr] : [curr], []),
      }));
  })();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.history.pushState(null, '', `?page=${pageNumber}`);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="container my-4">
      <div className="p-4 rounded" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="mb-3 text-center">Jobs in Austin</h1>
        <p className="mb-3 text-center">Number of jobs: {filteredJobs.length}</p>

        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search jobs..."
          style={{
            backgroundColor: "#e9713a",
            color: "#fff",
            borderRadius: "5px",
            padding: "8px",
            border: "none",
          }}
        />

        <div className="d-flex justify-content-center gap-3 my-3">
          <select 
            className="form-select" 
            value={selectedValue} 
            onChange={handleChange} 
            style={{ backgroundColor: '#e9713a', color: '#fff' }}
          >
            <option value="">Sort ⇅</option>
            <option value="name,a">Name ↑</option>
            <option value="name,r">Name ↓</option>
            <option value="title,a">Title ↑</option>
            <option value="title,r">Title ↓</option>
            <option value="area,a">Area ↑</option>
            <option value="area,r">Area ↓</option>
            <option value="pay,a">Pay ↑</option>
            <option value="pay,r">Pay ↓</option>
          </select>

          <select 
            className="form-select" 
            value={selectedFilterValue} 
            onChange={handleFilterChange} 
            style={{ backgroundColor: '#e9713a', color: '#fff' }}
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

        <label className="flex items-center gap-2 m-2 md:m-4">
          Items per page: {itemsPerPage}
          <input
            type="range"
            min="4"
            max="24"
            step="4"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="form-range ml-4"
          />
        </label>

        <div className="row justify-content-center">
          {currentItems.length === 0 ? (
            <div className="text-center">No results</div>
          ) : (
            currentItems.map((jobItem, index) => (
              <JobCard key={index} jobItem={jobItem} />
            ))
          )}
        </div>

        <nav className="mt-4">
          <ul className="pagination pagination-sm justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link px-3" onClick={() => paginate(currentPage - 1)}>Previous</button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link px-3" onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link px-3" onClick={() => paginate(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default JobsPage;
