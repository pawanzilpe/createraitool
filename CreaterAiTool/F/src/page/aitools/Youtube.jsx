// https://console.cloud.google.com/welcome?project=amazing-city-490307-h1
import React, { useState } from "react";
import axios from "axios";
import "./Youtube.css";
const Youtube = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = () => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          q: search,
          key: "AIzaSyDkMA75qMWAF0_QYTjezE4E2jCOelXijQg",
          part: "snippet",
        },
      })
      .then((response) => {
        setResult(response.data.items);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="youtube-container">
      <h2>🎥 YouTube Video Search</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search videos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="video-grid">
        {result.map((item, index) => (
          <div className="video-card" key={index}>
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${item.id.videoId}`}
              title={item.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Youtube;
