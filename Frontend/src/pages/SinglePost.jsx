// src/pages/SinglePost.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import useUser from "../context/useUser";

const SinglePost = () => {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    };

    fetchPost();
  }, [postId]);

  const fetchLike = async () => {
    try {
      const token = localStorage.getItem("token"); // or from user context

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/${postId}/like`,
        {}, // empty body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedPost = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${postId}`
      );
      setPost(updatedPost.data);
    } catch (err) {
      console.error("Failed to fetch likes:", err);
    }
  };

  useEffect(() => {
    const fetchPostAndView = async () => {
      try {
        const token = localStorage.getItem("token");

        // Update view count
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/${postId}/view`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Then fetch post
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch post or update view:", err);
      }
    };

    fetchPostAndView();
  }, [postId]);

  const timeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const mins = Math.floor(diffInSeconds / 60);
    if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  };

  if (!post)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-[1.5px] border-gray-400 border-t-black rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="relative">
      <div className="relative  -left-10  mt-4">
        <div className="flex justify-around  items-center">
          <div>
            <Link to={"/home"} className="text-3xl font-bold mb-24">
              CodeCraft
            </Link>
          </div>

          <div className="flex justify-between items-center gap-20 font-semibold text-lg">
            <NavLink
              to={"/blogs"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              Blogs{" "}
            </NavLink>
            <NavLink
              to={"/categories"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              Categories
            </NavLink>
            <NavLink
              to={"/about"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              About
            </NavLink>
            <NavLink
              to={"/contact"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              Contact
            </NavLink>
          </div>

          <div className="absolute right-4">
            <img
              className="h-12 w-12 rounded-full relative"
              src={user?.profilePicture}
              alt="Profile"
            />
            <p className="text-xs font-medium absolute text-center">
              {user.fullname}
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {user._id === post.postedBy._id && (
          <Link to={`/posts/${postId}/delete`}>
            <button className="absolute top-[8%] right-[25%] tracking-wider border-[1px] border-red-300 text-sm font-semibold p-3 px-6 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-red-600 ">
              Delete
            </button>
          </Link>
        )}
        <img
          src={post.coverImage}
          alt="Cover"
          className="rounded-xl mb-6 w-full object-cover max-h-[400px]"
        />
        <div className="flex gap-4 text-sm text-gray-600 mb-4">
          <span onClick={fetchLike} className="mr-4">
            <i
              className={`mr-1 text-lg ${
                post.likes > 0 ? "ri-heart-fill text-red-500" : "ri-heart-line"
              }`}
            ></i>
            {post.likes}
          </span>
          <span className="mr-4">
            <i class="ri-message-line mr-1 text-lg"></i>12
          </span>
          <span>
            <i className="ri-time-line mr-1 text-lg"></i>
            {timeAgo(post.createdAt)}
          </span>
          <span>
            <i className="ri-eye-line mr-1 text-lg"></i>
            {post.views}
          </span>
        </div>
        <p className="text-lg leading-7">{post.content}</p>
      </div>
    </div>
  );
};

export default SinglePost;
