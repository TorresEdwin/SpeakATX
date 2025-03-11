import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './assets/fonts.css';

// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap (if needed)
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
import JobInstance from "./pages/job_instance";  
import CommunityInstance from "./pages/community_instance";
import TranslationInstance from "./pages/translation_instance";

import React from "react";
import { LoadScript } from "@react-google-maps/api";

// Replace with your actual API key
const GOOGLE_MAPS_API_KEY = "AIzaSyB7u06JfzlscQJXjFW2NVvfD6U3PaUEZsY";

function App() {
  return (
    <>
      {/* Load Google Maps API once for the whole app */}
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <Router>
          <Navbar />
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
      </LoadScript>
    </>
  );
}

export default App;
