import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProduct = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: product._id,
    title: product.title || "",
    description: product.description || "",
    price: product.price || "",
    highPrice: product.highPrice || "",
    quantity: product.quantity || "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    setFormData({
      id: product._id,
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      highPrice: product.highPrice || "",
      quantity: product.quantity || "",
    });
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, title, description, price, highPrice, quantity } = formData;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/product/update/${id}`,
        {
          title: title !== "" ? title : undefined,
          description: description !== "" ? description : undefined,
          price: price !== "" ? price : undefined,
          highPrice: highPrice !== "" ? highPrice : undefined,
          quantity: quantity !== "" ? quantity : undefined,
        }
      );

      setResponseMessage(response.data.message);
      onUpdate(response.data.updatedProduct);
      onClose();
    } catch (error) {
      console.error(error);
      setResponseMessage("Error in updating product");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            High Price:
          </label>
          <input
            type="number"
            name="highPrice"
            value={formData.highPrice}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Quantity:
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </form>
      {responseMessage && (
        <p className="mt-4 text-sm text-gray-600">{responseMessage}</p>
      )}
    </div>
  );
};

export default UpdateProduct;
