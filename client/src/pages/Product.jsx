import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice";
import UpdateProduct from "./UpdateProduct";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getAllProducts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product/getAll`
      );
      if (response?.data?.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log("Oops, something went wrong");
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/product/delete/${id}`
      );
      if (response?.data?.success) {
        setProducts(products.filter((currElem) => currElem._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(
      products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      {selectedProduct ? (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={handleUpdate}
        />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((currElem, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 transition duration-300 transform hover:scale-105"
            >
              <p className="font-semibold text-lg mb-2">{currElem.title}</p>
              <p className="text-gray-600 mb-2">{currElem.description}</p>
              <p className="text-gray-800 font-bold mb-2">${currElem.price}</p>
              <p className="text-gray-700 mb-2">
                High Price: ${currElem.highPrice}
              </p>
              <p className="text-gray-700 mb-4">
                Quantity: {currElem.quantity}
              </p>
              {currElem.images &&
                currElem.images.map((item, imgIndex) => (
                  <div key={imgIndex}>
                    <img
                      src={item.url}
                      alt={`Product ${index} - Image ${imgIndex}`}
                      className="rounded-md mb-2"
                    />
                  </div>
                ))}
              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(currElem._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedProduct(currElem)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">No products added yet</p>
      )}
    </div>
  );
};

export default Product;
