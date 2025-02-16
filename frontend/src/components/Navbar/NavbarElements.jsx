import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #bf5700;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 12;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
`;

// Desktop Menu
export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    @media screen and (max-width: 768px) {
        display: none; /* Hide desktop menu on mobile */
    }
`;

export const NavLink = styled(Link)`
    color: #FFFFFF;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    font-size: 1.7rem;
    font-family: 'Roboto', sans-serif;
    margin: 0 1rem;

    &.active {
        color: rgb(144, 219, 176);
    }
`;

// Hamburger Icon for Mobile
export const Bars = styled(FaBars)`
    display: none;
    color: #FFFFFF;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        font-size: 2rem;
        cursor: pointer;
    }
`;

// Mobile Dropdown Menu
export const MobileMenu = styled.div`
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: #222;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 20px 0;
`;

export const CloseIcon = styled(FaTimes)`
    position: absolute;
    right: 20px;
    top: 15px;
    font-size: 2rem;
    cursor: pointer;
    color: #FFFFFF;
`;
