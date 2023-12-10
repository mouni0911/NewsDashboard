import React, { useState } from "react";
import NewsItem from "./NewsItem";

const NewsList = ({ news, onLoadMore }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(news.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <ul>
        {currentNews.map((article, index) => (
          <NewsItem key={index} article={article} />
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from(
          { length: Math.ceil(news.length / itemsPerPage) },
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(news.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsList;
