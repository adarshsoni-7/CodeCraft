import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeletePost = () => {
  const { postId } = useParams();
    
  const navigate = useNavigate();

  useEffect(() => {
    const deletePost = async () => {
      try {
        const token = localStorage.getItem("token");
          

        await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/delete`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Redirect only after successful deletion
        navigate("/home");
      } catch (err) {
        console.error("Error deleting post:", err);
        console.log("Full error:", err?.response?.data);  
        navigate(`/error`);
      }
    };

    deletePost();
  }, [postId, navigate]);

  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-10 h-10 border-[1.5px] border-gray-400 border-t-black rounded-full animate-spin"></div>
    </div>
  );
};

export default DeletePost;
