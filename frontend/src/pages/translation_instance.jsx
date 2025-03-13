import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import Instances from "./instances.jsx";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Default fallback location: Austin, TX
const DEFAULT_LOCATION = { lat: 30.2672, lng: -97.7431 };

const TranslationInstance = () => {
  const { translationName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Google Maps API Key
  const googleMapsApiKey = "AIzaSyB7u06JfzlscQJXjFW2NVvfD6U3PaUEZsY"; // Replace with actual key

  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey,
  });

  // State management
  const [coordinates, setCoordinates] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(true);

  // Scroll to top whenever route changes
  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 10);
  }, [location]);

  var translation = Instances.translations.find(
    (t) => t.name.toLowerCase() === translationName.toLowerCase()
  );


  // Load correct coordinates when `translation` changes
  useEffect(() => {
    if (!translation) {
      setCoordinates(DEFAULT_LOCATION);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Use stored coordinates if available
    const [lat, long] = translation.map_location.split(',').map(str => parseFloat(str.trim()));
    if (lat && long) {
      console.log(`Using stored coordinates for ${translation.name}:`, translation.map_location);
      setCoordinates({
        lat: lat,
        lng: long,
      });
      setLoading(false);
      return;
    }

    // If no lat/lng, fetch from Google Maps API using address
    if (translation.area !== "unknown") {
      const fullAddress = translation.area;
      fetchCorrectCoordinates(fullAddress);
    } else {
      setCoordinates(DEFAULT_LOCATION);
      setLoading(false);
    }
  }, [translationName]); // Run when the instance name changes

  // Fetch correct lat/lng from Google Maps API
  const fetchCorrectCoordinates = async (address) => {
    console.log("Fetching coordinates for:", address);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: { address, key: googleMapsApiKey },
        }
      );

      if (response.data.results.length > 0) {
        const loc = response.data.results[0].geometry.location;
        console.log(`Fetched coordinates for ${translation.name}:`, loc);
        setCoordinates({ lat: loc.lat, lng: loc.lng });
      } else {
        console.error("Google API returned no results for:", address);
        setCoordinates(DEFAULT_LOCATION);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setCoordinates(DEFAULT_LOCATION);
    } finally {
      setLoading(false);
    }
  };

  const [loaded, setLoaded] = useState(Instances.loaded);
  useEffect(() => {
    const checkLoadedStatus = () => {
      setLoaded(Instances.loaded); // Update the state when Instances.loaded changes
    };

    const intervalId = setInterval(checkLoadedStatus, 500); // Check every 500ms

    return () => clearInterval(intervalId);
  }, [])
  if (!loaded) return <div><div class="spinner-border text-dark" role="status"></div></div>;

  translation = Instances.translations.find(
    (t) => t.name.toLowerCase() === translationName.toLowerCase()
  );

  // If no matching translation, show error
  if (!translation) {
    return (
      <div className="container mt-4">
        <h1>Service Not Found</h1>
        <button className="back-button btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    );
  }

  let filteredJobs = []
  for (let i = 0; i < Instances.jobs.length; i++) {
    if (Instances.matchingValues(Instances.jobs[i].language, translation.language)) {
      filteredJobs.push(Instances.jobs[i]);
    }
  }
  let filteredCommunities = []
  for (let i = 0; i < Instances.communities.length; i++) {
    if (Instances.matchingValues(Instances.communities[i].language, translation.language)) {
      filteredCommunities.push(Instances.communities[i]);
    }
  }


  return (
    <div className="container mt-4">
      <button
        className="back-button btn btn-primary button-fixed button-grow"
        style={{ top: "80px", left: "20px" }}
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <h1>{translation.name}</h1>

      {/* Embedded Google Map */}
      <div className="mb-4">
        {loading || !isLoaded ? (
          <p>Loading map...</p>
        ) : (
          <GoogleMap
            key={coordinates.lat + coordinates.lng} // Forces re-render on coordinate change
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={15}
          >
            <Marker position={coordinates} />
          </GoogleMap>
        )}
      </div>

      <p>
        <strong>Rating:</strong> {translation.rating}
      </p>
      <p>
        <strong>Language:</strong> {translation.language.charAt(0).toUpperCase() + translation.language.slice(1)}
      </p>
      <p>
        <strong>Address:</strong>{" "}
        {translation.location?.display_address?.join(", ")}
      </p>
      <p>
        <strong>Price:</strong> {translation.price ? "💲".repeat(translation.price) : "N/A"}
      </p>
      <p style={{ textAlign: "left", maxWidth: "900px", margin: "0 auto" }}>
        <strong>About:</strong> {translation.descr}
      </p>

      <div className="d-flex justify-content-center gap-3 mt-3 mb-3">
        <button
          className="btn btn-success button-grow"
          onClick={() => window.open(translation.website, "_blank")}
        >
          View Service
        </button>
      </div>

      <div className="d-flex justify-content-center mb-5">
        <button
          className="btn btn-success button-grow"
          onClick={() =>
            window.open((translation.area !== "unknown" && translation.area !== "") ? "https://maps.google.com/maps?q=" + translation.area : "https://maps.google.com/maps?q=" + translation.map_location, "_blank")
          }
        >
          View Map
        </button>
      </div>



      <div className="row justify-content-center">
        <h3>{translation.language} Communities</h3>
        {filteredCommunities.slice(0, 4).map((communityItem, index) => (
          <div className="col-md-3 mb-3" key={index}>
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
                  Language: {communityItem.language} <br />
                  Area: {communityItem.area} <br />
                  Member Count: {communityItem.member_count} <br />
                  Type: {communityItem.type}
                </p>
              </div>
            </Link>
          </div>
        ))}

        <h3>{translation.language} Job Postings</h3>
        {filteredJobs.slice(0, 4).map((jobItem, index) => (
          <div className="col-md-3 mb-3" key={index}>
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
    </div>
  );
};

export default TranslationInstance;
