// Filename - pages/JobDetail.jsx
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Instances from "./instances.jsx";

const TranslationInstance = () => {
    const { translationName } = useParams(); // Get job name from URL
    const navigate = useNavigate(); // Hook to navigate programmatically
    const translation = Instances.translations.find(translation => translation.name === translationName); // Find the matching job

    if (!translation) {
        return <div className="container mt-4"><h1>Translation Not Found</h1><button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button></div>;
    }

    return (
        <div className="container mt-4">
            <h1>{translation.name}</h1>
            <img src={translation.imageUrl} alt={translation.name} className="img-fluid" style={{ maxHeight: "300px", objectFit: "cover" }} />
            <p><strong>Rating:</strong> {translation.rating}</p>
            <p><strong>Language:</strong> {translation.language}</p>
            <p><strong>Area:</strong> {translation.area}</p>
            <p><strong>Price:</strong> ${translation.price}/hr</p>
            <button className="btn btn-primary mt-3 mb-5" onClick={() => navigate(-1)}>Back</button>

            <div className="row">
                <h3>{translation.language} Communities</h3>
                {Instances.communities.map((communityItem, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <Link
                            to={`/communities/${communityItem.name}`}  // Links to dynamic job page
                            className="card text-decoration-none"
                        >
                            <img
                                src={communityItem.imageUrl}
                                alt={communityItem.name}
                                className="card-img-top"
                                style={{ height: "220px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{communityItem.name}</h5>
                                <p className="card-text">
                                    {communityItem.title} <br />
                                    Pay: ${communityItem.pay}/hr <br />
                                    Language: {communityItem.language} <br />
                                    Area: {communityItem.area}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}

                <h3>{translation.language} Job Postings</h3>
                {Instances.jobs.map((jobItem, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <Link
                            to={`/jobs/${jobItem.name}`}  // Links to dynamic job page
                            className="card text-decoration-none"
                        >
                            <img
                                src={jobItem.imageUrl}
                                alt={jobItem.name}
                                className="card-img-top"
                                style={{ height: "220px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{jobItem.name}</h5>
                                <p className="card-text">
                                    {jobItem.title} <br />
                                    Pay: ${jobItem.pay}/hr <br />
                                    Language: {jobItem.language} <br />
                                    Area: {jobItem.area}
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>
        </div >
    );
};

export default TranslationInstance;