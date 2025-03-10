import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { 
    Nav, NavBrand, NavLink, NavMenu, Bars, MobileMenu, CloseIcon 
} from "./NavbarElements";
import Instances from "../../pages/instances";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get the current route

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Function to change the favicon dynamically
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

    // Map routes to page titles & favicon updates
    useEffect(() => {
        const pageTitles = {
            "/": "SpeakATX - Home",
            "/translations": "SpeakATX - Services",
            "/communities": "SpeakATX - Communities",
            "/jobs": "SpeakATX - Jobs",
            "/about": "SpeakATX - About Us"
        };

        Instances.getInstances();

        // Update document title
        document.title = pageTitles[location.pathname] || "SpeakATX";

        // Update favicon dynamically
        changeFavicon("https://speakatx-images.s3.us-east-2.amazonaws.com/misc/favicon.png"); // Ensure favicon.png is in "public/" folder
    }, [location.pathname]);

    return (
        <Nav>
            {/* Site Name / Branding */}
            <NavBrand to="/">SpeakATX</NavBrand>

            {/* Hamburger Icon for Mobile */}
            <Bars onClick={toggleMenu} />

            {/* Desktop Navigation */}
            <NavMenu>
                <NavLink to="/translations" activeStyle>
                    Services
                </NavLink>
                <NavLink to="/communities" activeStyle>
                    Communities
                </NavLink>
                <NavLink to="/jobs" activeStyle>
                    Jobs
                </NavLink>
                <NavLink to="/about" activeStyle>
                    About
                </NavLink>
            </NavMenu>

            {/* Mobile Menu (Dropdown) */}
            {isOpen && (
                <MobileMenu>
                    <CloseIcon onClick={toggleMenu} />
                    <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                    <NavLink to="/translations" onClick={toggleMenu}>Services</NavLink>
                    <NavLink to="/communities" onClick={toggleMenu}>Communities</NavLink>
                    <NavLink to="/jobs" onClick={toggleMenu}>Jobs</NavLink>
                    <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
                </MobileMenu>
            )}
        </Nav>
    );
};

export default Navbar;
