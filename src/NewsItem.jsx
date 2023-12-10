import React, { useState } from "react";

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage, publishedAt, source } = article;
  const [showMore, setShowMore] = useState(false);

  const handleReadMore = () => {
    setShowMore(!showMore);
  };

  return (
    <li>
      {urlToImage && (
        <img src={urlToImage} alt={title} style={{ maxWidth: "100%" }} />
      )}
      <h2>{title}</h2>
      {showMore ? (
        <>
          <p>{description}</p>
          <p className="published-info">
            Published by: {source.name} on{" "}
            {new Date(publishedAt).toLocaleDateString()}
          </p>

          <a href={url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </>
      ) : (
        <button onClick={handleReadMore}>Read more</button>
      )}
    </li>
  );
};

export default NewsItem;
