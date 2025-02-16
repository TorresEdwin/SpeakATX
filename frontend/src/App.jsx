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


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
            <Navbar/>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/translations" element={<TranslationsPage />} />
                <Route path="/communities" element={<CommunitiesPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
  );
}

export default App
