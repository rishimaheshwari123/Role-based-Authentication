import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SinglePost = () => {
  const [loading, setLoading] = useState(true);
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/post/get/${id}`
      );
      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }
      setSingleProduct(response?.data?.post);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const createComment = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/post/create-comment/${id}`,
        comment
      );
      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }
      setComment("");
      toast.success("comment add successfully!");
      getSingleProduct();
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {singleProduct ? (
            <div className="bg-white p-4 rounded shadow-md">
              <div className="space-y-2">
                {singleProduct.images &&
                  singleProduct.images.map((img, imgIndex) => (
                    <div key={imgIndex}>
                      <img
                        src={img.url}
                        alt=""
                        className="w-full h-48 object-cover rounded"
                      />
                    </div>
                  ))}
                <p className="text-xl font-semibold text-gray-800">
                  {singleProduct.title}
                </p>
                <p className="text-gray-600">{singleProduct.desc}</p>
              </div>
              <div className="mt-4">
                <p className="font-bold">Add a comment</p>
                <div className="flex items-center">
                  <input
                    className="border h-8 p-2 w-full"
                    type="text"
                    name="title"
                    value={comment.title}
                    id="title"
                    placeholder="Enter your comment"
                    onChange={handleChange}
                  />
                  <button
                    onClick={createComment}
                    className="ml-3 bg-blue-500 text-white px-5 py-2 rounded"
                  >
                    Comment
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <p className="font-bold">All Comments</p>
                {singleProduct.comment &&
                  singleProduct.comment.map((comment, index) => (
                    <div key={index} className="mt-4 p-2 bg-gray-100 rounded">
                      <p className="text-sm text-gray-700">{comment.title}</p>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No product found</p>
          )}
        </>
      )}
    </div>
  );
};

export default SinglePost;
