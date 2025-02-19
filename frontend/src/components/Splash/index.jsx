import React, {useEffect} from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const Splash = () => {
    useEffect(() => {
        // Dynamically load the Google Translate script
        const script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
        
        var duplicate_google_translate_counter = 0;//this stops google adding button multiple times
        
        // Initialize the Google Translate widget when the script is loaded
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en', // Default language
                includedLanguages: 'en,es,fr,de,it,pt', // List of available languages
            }, 'google_translate_element');
        };
        
        return () => {
            // Clean up script when component unmounts
            document.body.removeChild(script);
        };
    }, []);

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

            <div id="google_translate_element"></div>

        </>
    );
};

export default Splash;
