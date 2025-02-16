// Filename - pages/index.js

import React from "react";
import Picture from "../assets/picture.webp"

const Home = () => {
    return (
        <main className="splash-main">
            <div className="splash-page">
                <img src={Picture} className="splash-image"></img>
                <h1 className="splash-title splash" >Welcome to SpeakATX</h1>
            </div>
        </main>
    );
};

export default Home;
