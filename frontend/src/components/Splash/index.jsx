import React, { useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const Splash = () => {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
                autoDisplay: false
            },
            "google_translate_element"
        );
    };
    useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);


    return (
        <>
            <div className="splash-content">
                <h1 className="display-4">SpeakATX</h1>
                <p className="lead">
                    Resources for minimal English
                    and non-English speakers in Austin, TX
                </p>
                <hr className="my-4" />
                <p>
                    Local communities, multilingual
                    services, and job postings
                </p>
            </div>

            <div id="google_translate_element"></div>

        </>
    );
};

export default Splash;
