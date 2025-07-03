import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeletePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/home");
    } catch (err) {
      console.error("Error deleting post:", err);
      navigate(`/error`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
      <p className="text-lg font-semibold text-center">Do you really want to delete this post?</p>

      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          {loading ? "Deleting..." : "Yes, Delete"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePost;
