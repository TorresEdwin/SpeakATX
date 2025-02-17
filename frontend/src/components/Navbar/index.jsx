import React, { useState } from "react";
import { 
    Nav, NavBrand, NavLink, NavMenu, Bars, MobileMenu, CloseIcon 
} from "./NavbarElements";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Nav>
                {/* Site Name / Branding */}
                <NavBrand to="/">SpeakATX</NavBrand>

                {/* Hamburger Icon for Mobile */}
                <Bars onClick={toggleMenu} />

                {/* Desktop Navigation */}
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/services" activeStyle>
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
                        <NavLink to="/translations" onClick={toggleMenu}>Translations</NavLink>
                        <NavLink to="/communities" onClick={toggleMenu}>Communities</NavLink>
                        <NavLink to="/jobs" onClick={toggleMenu}>Jobs</NavLink>
                        <NavLink to="/about" onClick={toggleMenu}>About</NavLink>
                    </MobileMenu>
                )}
            </Nav>
        </>
    );
};

export default Navbar;
