import React from "react";

const services = [
  { name: "Community 1" },
  { name: "Community 2" },
  { name: "Community 3" },
  { name: "Community 4" },
  { name: "Community 5" },
  { name: "Community 6" },
  { name: "Community 7" },
  { name: "Community 8" },
  { name: "Community 9" },
  { name: "Community 10" },
  { name: "Community 1" },
  { name: "Community 2" },
  { name: "Community 3" },
  { name: "Community 4" },
  { name: "Community 5" },
  { name: "Community 6" },
  { name: "Community 7" },
  { name: "Community 8" },
  { name: "Community 9" },
  { name: "Community 10" },
];

const CommunitiesPage = () => {
  return (
    <div className="container mt-4">
      <br/>
      <h1 className="text-center mb-4">Communities in Austin</h1>
      <div 
        style={{ 
          display: "grid", 
          gap: "30px",
          gridTemplateColumns: "repeat(3, 1fr)", /* Always 5 columns */
          gridTemplateRows: "repeat(2, auto)", /* Adjust row height based on content */
          gridAutoRows: "minmax(180px, auto)", /* Allows flexibility in row height */
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {services.map((service, index) => (
          <button
            key={index}
            style={{
              border: "none",
              borderRadius: "12px",
              padding: "40px",
              minHeight: "340px",
              boxShadow: "4px 4px 12px rgba(0,0,0,0.1)",
              fontSize: "22px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white",
              position: "relative",
              backgroundImage: "url('/placeholder2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              objectFit: "cover", /* Ensures the image covers the button without cutting off */
            }}
            onClick={() => alert(`You clicked on ${service.name}`)}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1.0)"}
          >
            <h2 
              style={{ 
                fontSize: "32px", 
                background: "rgba(0, 0, 0, 0.5)", 
                padding: "10px", 
                borderRadius: "8px",
              }}
            >
              {service.name}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommunitiesPage;
