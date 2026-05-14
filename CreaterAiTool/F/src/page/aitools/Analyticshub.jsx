// Analyticshub.jsx
import React, { useEffect, useState } from "react";

const Analyticshub = () => {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your project ID and API key
  const PROJECT_ID = "YOUR_PROJECT_ID";
  const API_KEY = "AIzaSyCGhaDCp6A5pGKRcHlRu2qf9ll-62nq2dc";
  const API_URL = `https://analyticshub.googleapis.com/v1beta/projects/${PROJECT_ID}/dataExchanges?key=${API_KEY}`;

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // Analytics Hub returns `dataExchanges` array
        setAnalytics(data.dataExchanges || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [API_URL]);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Analytics Hub Data Exchanges</h2>
      {analytics.length === 0 ? (
        <p>No analytics data available.</p>
      ) : (
        <ul>
          {analytics.map((item, index) => (
            <li key={index}>
              <strong>{item.displayName}</strong> ({item.name})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Analyticshub;
