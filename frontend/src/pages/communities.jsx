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
];

const CommunitiesPage = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "80px" }}>Communities in Austin</h1>
      <div 
        style={{ 
          display: "grid", 
          gap: "30px",
          gridTemplateColumns: "repeat(5, 1fr)", 
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {services.map((service, index) => (
          <div 
            key={index} 
            style={{ 
              border: "1px solid #ddd", 
              borderRadius: "12px", 
              padding: "40px", 
              minHeight: "180px", 
              boxShadow: "4px 4px 12px rgba(0,0,0,0.1)", 
              fontSize: "22px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "white", /* Ensures text is readable */
              position: "relative",
              backgroundImage: "url('/placeholder2.jpg')", /* Sets background image */
              backgroundSize: "cover", /* Ensures the image covers the cell */
              backgroundPosition: "center", /* Centers the image */
              backgroundRepeat: "no-repeat", /* Prevents tiling */
            }}
          >
            <h2 style={{ fontSize: "32px", background: "rgba(0, 0, 0, 0.5)", padding: "10px", borderRadius: "8px" }}>
              {service.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunitiesPage;
