import axios from "axios";
import { useNavigate } from "react-router-dom";
import usePost from "../context/usePost";

const DeleteAllBlogs = () => {
  const {post,setPost} = usePost();
  const navigate = useNavigate();

  const handleDeleteAllBlogs =async  (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const deletedBlogs = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/posts/deleteAll`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPost(deletedBlogs.data);
   
    navigate("/blogs");
  };

  return (
    <div>
       {post.length > 0 && (
      <div>      
      <h4 className="font-medium text-2xl mb-6">Delete Blogs</h4>
      <p className="text-sm text-gray-600">
        Are you sure you want to delete your blog posts? This action cannot be
        undone.
      </p>
      
      <button onClick={handleDeleteAllBlogs} className="mt-4 tracking-wide border border-red-400 text-lg font-semibold p-2 px-6 rounded-lg transition duration-300 hover:text-white hover:bg-red-600 disabled:opacity-60">
        Delete All Blogs
      </button>
    </div>
    )}
     
    </div>
    
  );
};

export default DeleteAllBlogs;
