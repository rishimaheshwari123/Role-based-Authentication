import axios from "axios";
import React, { useEffect, useState } from "react";

const GetNews = () => {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/news/get");
      if (res?.data?.success) {
        setNews(res.data.news);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  const handleActive = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/news/up/${id}`,
        {
          active: false,
        }
      );
      if (res?.data?.success) {
        // Update the state to reflect the changes immediately
        setNews((prevNews) =>
          prevNews.map((item) =>
            item._id === id ? { ...item, active: false } : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      {news.length > 0 ? (
        news
          .filter((item) => item.active)
          .map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
              <button
                className="cursor-pointer"
                onClick={() => handleActive(item._id)}
              >
                Active
              </button>
            </div>
          ))
      ) : (
        <p>No news available</p>
      )}
    </>
  );
};

export default GetNews;
