// Filename - "./components/Navbar.js

import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/translations" activeStyle>
                        Translations
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
            </Nav>
        </>
    );
};

export default Navbar;
