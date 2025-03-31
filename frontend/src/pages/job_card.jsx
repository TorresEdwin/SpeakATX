import React from 'react';
import { Link } from 'react-router-dom';

const placeholderImage =
    "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png";

const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const JobCard = ({
    jobItem
}) => {
    return (
        <div className="col-md-3 mb-3">
            <Link
                to={`/jobs/${jobItem.originalName}`} // Links to dynamic job page
                className="card text-decoration-none d-flex flex-column justify-content-between"
                style={{ height: "500px" }} // Increased card height
            >
                <img
                    src={jobItem.imageUrl}
                    alt={jobItem.name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }} // Increased image height
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImage;
                    }} // Handle broken images
                />
                <div
                    className="card-body d-flex flex-column justify-content-between"
                    style={{ flex: 1 }}
                >
                    <h5 className="card-title">{jobItem.name}</h5>
                    <p className="card-text">
                        {jobItem.title} <br />
                        Pay: ${jobItem.pay}/hr <br />
                        Language: {capitalizeFirstLetter(jobItem.language)}
                        <br />
                        Area: {jobItem.area}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default JobCard;