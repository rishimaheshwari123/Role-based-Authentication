import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/category/getAll"
      );
      setCategories(response.data.cats);
      console.log("Fetched categories:", response.data.cats);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div>
      <p>Category</p>
      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <>
              <li key={category._id}>{category.name}</li>
              {category.subCat.map((curr) => (
                <>
                  <p>{curr.name}</p>
                  <p>{curr.desc}</p>
                </>
              ))}
            </>
          ))}
        </ul>
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};

export default Category;
