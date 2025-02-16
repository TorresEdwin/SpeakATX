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
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/translations" activeStyle>
                        translations
                    </NavLink>
                    <NavLink to="/communities" activeStyle>
                        communities
                    </NavLink>
                    <NavLink to="/jobs" activeStyle>
                        jobs
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
