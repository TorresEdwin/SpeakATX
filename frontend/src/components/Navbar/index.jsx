import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
    Nav, NavBrand, NavLink, NavMenu, Bars, MobileMenu, CloseIcon 
} from "./NavbarElements";
import InstanceLoader from "../../pages/instance_loader";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true); // Show navbar initially
    const location = useLocation(); 

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const changeFavicon = (iconURL) => {
        let link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = iconURL;
        } else {
            const newLink = document.createElement("link");
            newLink.rel = "icon";
            newLink.href = iconURL;
            document.head.appendChild(newLink);
        }
    };

    useEffect(() => {
        const pageTitles = {
            "/": "SpeakATX - Home",
            "/translations": "SpeakATX - Services",
            "/communities": "SpeakATX - Communities",
            "/jobs": "SpeakATX - Jobs",
            "/about": "SpeakATX - About Us",
            "/search": "SpeakATX - Search"
        };

        // Update document title
        document.title = pageTitles[location.pathname] || "SpeakATX";
        changeFavicon("https://speakatx-images.s3.us-east-2.amazonaws.com/misc/favicon.png");
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            // Check if the page is at the top or scrolled down
            if (window.scrollY == 0) {
                setShowNavbar(true);  // Show Navbar if at the top of the page
            } else {
                setShowNavbar(false); // Hide Navbar if scrolled down
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // Empty dependency array to run once on mount

    return (
        <Nav isVisible={showNavbar}> {/* Use isVisible here */}
            <NavBrand to="/">SpeakATX</NavBrand>
            <Bars onClick={toggleMenu} />

            <NavMenu>
                <NavLink to="/translations" activeStyle>Services</NavLink>
                <NavLink to="/communities" activeStyle>Communities</NavLink>
                <NavLink to="/jobs" activeStyle>Jobs</NavLink>
                <NavLink to="/about" activeStyle>About</NavLink>
                <NavLink to="/search" activeStyle><span class="material-symbols-outlined">search</span></NavLink>
            </NavMenu>

            {isOpen && (
                <MobileMenu>
                    <CloseIcon onClick={toggleMenu} />
                    <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                    <NavLink to="/translations" onClick={toggleMenu}>Services</NavLink>
                    <NavLink to="/communities" onClick={toggleMenu}>Communities</NavLink>
                    <NavLink to="/jobs" onClick={toggleMenu}>Jobs</NavLink>
                    <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
                    <NavLink to="/search" onClick={toggleMenu}>Search</NavLink>
                </MobileMenu>
            )}
        </Nav>
    );
};

export default Navbar;
