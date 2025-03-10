import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InstanceLoader() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function will run when the component mounts
    const fetchData = async () => {
      try {
        setLoading(true);
        // Make the API request
        const response = await axios.get('https://your-api-endpoint.com/data');
        
        // Update state with the response data
        setData(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    // Call the function
    fetchData();
    
    // The empty array below means this effect runs once on mount
  }, []);

  // Render based on state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h1>Data from API</h1>
      {/* Render your data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default InstanceLoader;