import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const News = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);

      const response = await axios.post(
        `http://localhost:8080/api/v1/news/create`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response?.data?.success) {
        toast.success("News created successfully!");
        setFormData({
          name: "",
        });
      } else {
        toast.error("Failed to create news!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Oops, something went wrong!");
    }
  };

  return (
    <>
      <h1 className="text-blue-600 text-center text-3xl border border-b-2 border-blue-600 pb-2">
        Add News
      </h1>
      <form
        onSubmit={handleSubmit}
        className="sm:grid grid-cols-1 md:grid-cols-2 md:gap-4 md:mt-20 mt-10"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="name"
          >
            Name : <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-[50px] text-2xl"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center justify-between mt-5">
          <button
            className="px-8 py-4 bg-black text-white rounded-md text-sm"
            type="submit"
          >
            Create News
          </button>
        </div>
      </form>
    </>
  );
};

export default News;
