import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.
// import { Container } from 'react-bootstrap';


import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import TranslationsPage from "./pages/translations";
import CommunitiesPage from './pages/communities';
import JobsPage from './pages/jobs';
import JobInstance from "./pages/job_instance";  // Import the job details page
import CommunityInstance from "./pages/community_instance";
import TranslationInstance from "./pages/translation_instance";

import React from "react";
function App() {

  return (
    <>
      <Router>
              <Navbar/>
              <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/translations" element={<TranslationsPage />} />
                  <Route path="/communities" element={<CommunitiesPage />} />
                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/about" element={<About />} />
                  {/* Dynamic Job Details Page */}
                  <Route path="/jobs/:jobName" element={<JobInstance />} /> 
                  <Route path="/communities/:communityName" element={<CommunityInstance />} /> 
                  <Route path="/translations/:translationName" element={<TranslationInstance />} /> 
                  
              </Routes>
              
      </Router>
    </>
  );
}

export default App
