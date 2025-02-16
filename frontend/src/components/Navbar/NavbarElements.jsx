import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #ffb3ff;
    height: 60px;
    display: flex;
    justify-content: center; /* Centers the navbar content */
    align-items: center; /* Centers vertically */
    z-index: 12;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw; /* Ensures full width */
`;

export const NavLink = styled(Link)`
    color: #808080;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    font-size: 1.7rem;
    font-family: 'Roboto', sans-serif;
    margin: 0 1rem; /* Balances spacing */
    &.active {
        color: #4d4dff;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; /* Ensures links stay centered */
    width: 100%; /* Uses full width to prevent shifting */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;
