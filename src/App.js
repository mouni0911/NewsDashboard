import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "./NewsList";
import "./App.css";

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              country: "us",
              apiKey: "d2ea9368e36d42f1a0a53fd1be8616ed",
              q: searchTerm,
            },
          }
        );
        setNews(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError("Error fetching news");
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchTerm]);

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    setNews([]);
  };

  return (
    <div>
      <h1>News Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
          style={{ width: "650px", padding: "15px", borderRadius: "25px" }}
        />
        <button
          onClick={handleSearch}
          style={{ borderRadius: "25px", padding: "12px" }}
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <NewsList news={news} />}
    </div>
  );
};

export default App;
