import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const Splash = () => {
    return (
        <>
            
            <div className="splash-content">
                <h1 className="display-4">SpeakATX</h1>
                <p className="lead">
                    Resources for minimal english 
                    and non-english speakers in Austin, TX
                </p>
                <hr className="my-4" />
                <p>
                    Local communities, translation 
                    services, and job postings
                </p>
            </div>

        </>
    );
};

export default Splash;
