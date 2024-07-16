import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Post = () => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  const getAllPost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/post/getAll`
      );
      if (!response?.data?.success) {
        throw new Error(toast.error(response?.data?.message));
      }
      setPost(response.data.posts);
      console.log(response.data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {post.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.map((currElem, index) => (
                <Link
                  key={index}
                  to={`/singlePost/${currElem._id}`}
                  className="bg-white p-4 rounded shadow-md"
                >
                  <div className="space-y-2">
                    {currElem.images.map((img, imgIndex) => (
                      <div key={imgIndex}>
                        <img
                          src={img.url}
                          alt=""
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    ))}
                    <p className="text-xl font-semibold text-gray-800">
                      {currElem.title}
                    </p>
                    <p className="text-gray-600">{currElem.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No post created yet</p>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
