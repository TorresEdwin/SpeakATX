import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const Splash = () => {
    return (
        <>
            
            <div className="splash-content">
                <h1 className="display-4">Welcome to SpeakATX</h1>
                <p className="lead">
                    Providing resources 
                    to minimal english and non-english speakers in Austin, TX.
                </p>
                <hr className="my-4" />
                <p>Local non-english 
                communities, translation services, and job postings.</p>
            </div>

        </>
    );
};

export default Splash;
