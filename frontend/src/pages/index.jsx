// Filename - pages/index.js

import React from "react";
import Picture from "../assets/picture.webp"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';


const Home = () => {
    return (
        <main className="splash-main">
            <Container className=" splash p-5 mb-4 bg-light rounded-3">
                <div className="splash-content">
                    <h1 className="display-4">Welcome to SpeakATX</h1>
                    <p className="lead">
                        SpeakATX is a website that aims to provide resources 
                        to minimal english and non-english speakers in Austin, TX.
                    </p>
                    <hr className="my-4" />
                    <p>It will have information on local non-english 
                    communities, translation services, and job postings.</p>
                </div>
                </Container>
        </main>
        
    );
};

export default Home;
