// CommunityCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const placeholderImage =
  "https://www.dunbarcentre.org/wp-content/uploads/2022/10/placeholder-1.png";

const capitalizeFirstLetter = (str) => {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const CommunityCard = ({
    communityItem
}) => {
    return (
        <div className="col-md-3 mb-3">
            <Link
    to={`/communities/${communityItem.originalName}`}
    className="card text-decoration-none d-flex flex-column justify-content-between"
    style={{ height: "500px" }}
>
                <img
                    src={communityItem.imageUrl}
                    alt={communityItem.name}
                    className="card-img-top"
                    style={{ height: "250px", objectFit: "cover" }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImage;
                    }}
                />
                <div
                    className="card-body d-flex flex-column justify-content-between"
                    style={{ flex: 1 }}
                >
                    <h5 className="card-title">{communityItem.name}</h5>
                    <p className="card-text">
                    Language: {capitalizeFirstLetter(communityItem.language)} <br />

                        <br />
                        Area: {communityItem.area} <br />
                        Member Count: {communityItem.member_count} <br />
                        Type: {capitalizeFirstLetter(communityItem.type)}

                    </p>
                </div>
            </Link>
        </div>
    );
};

export default CommunityCard;