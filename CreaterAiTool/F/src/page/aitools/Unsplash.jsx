import axios from "axios";
import React, { useState } from "react";
import "./Unsplash.css";


const Unsplash = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const handleSearch = () => {
    axios
      .get(`https://api.unsplash.com/search/photos?page=1&query=${search}`, {
        headers: {
          Authorization: "Client-ID dCECDOyqmsBIqPti1bHYKr-dNulN0LkFMC7IYScGpP8",
        },
      })
      .then(function (response) {
        console.log(response);
        setResult(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="unsplash-container">
      <p  className="search-bar">
        Search Image:{" "}
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button onClick={handleSearch}>search</button>
      </p>
      {result.length > 0 &&
        result.map((item) => {
          return <img src={item.urls.regular} alt="noimage" height={200} />;
        })}
    </div>
  );
};

export default Unsplash;
