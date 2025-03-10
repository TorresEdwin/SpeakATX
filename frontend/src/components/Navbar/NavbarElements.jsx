import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

// Navbar Container
export const Nav = styled.nav`
    background: #bf5700;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 12;
    position: fixed;
    top: ${({ isVisible }) => (isVisible ? '0' : '-80px')}; /* Controls navbar visibility */
    left: 0;
    width: 100vw;
    transition: top 0.3s ease-in-out; /* Smooth transition for hiding/showing navbar */
`;



// color: rgb(144, 219, 176); not used - temp
// Branding / Site Name
export const NavBrand = styled(Link)`
    color: #fff;
    font-size: 1.8rem;
    font-weight: bold;
    text-decoration: none;

    font-family: "DM Sans", serif !important;
    font-optical-sizing: auto;
    font-style: normal;

    cursor: pointer;

    transition: 0.3s;

    &:hover {
        color: #D3D3D3;
        transform: translateY(-5px);
    }
`;

// Desktop Menu
export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavLink = styled(Link)`
    color: #FFFFFF;
    text-decoration: none;
    padding: 0 1rem;
    font-size: 1.4rem;
    transition: 0.3s;

    &.active {
        color:#ffcc70;
    }

    &:hover {
        color:rgb(170, 170, 170);
        transform: translateY(-5px);
    }
`;

// Mobile Hamburger Icon
export const Bars = styled(FaBars)`
    display: none;
    color: #FFFFFF;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        right: 20px;
        top: 50%;
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
