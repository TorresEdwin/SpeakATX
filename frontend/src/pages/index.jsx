// Filename - pages/index.js

import React from "react";
import Picture from "../assets/picture.webp"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


const Home = () => {
    return (
        <main className="splash-main">
            {/* <div className="splash-page">
                <img src={Picture} className="splash-image"></img>
                <h1 className="splash-title splash" >Welcome to SpeakATX</h1>
            </div> */}
            <Container className=" splash p-5 mb-4 bg-light rounded-3">
                <h1 className="display-4">Welcome to SpeakATX</h1>
                <p className="lead">
                ummmmmm
                </p>
                <hr className="my-4" />
                <p>Use this space to provide important information.</p>
                <button className="btn btn-primary btn-lg">Get Started</button>
                </Container>
        </main>
        
    );
};

export default Home;
