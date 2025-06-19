import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

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

  return (
    <div>
        <div className="h-min-[40vh] bg-[#e6e2e2e8] p-24 py-32 -mt-3 mb-36 relative">
        <Link to={"/home"} className="text-3xl font-bold mb-24 absolute top-8 left-10">CodeCraft</Link>
        <h1 className="text-8xl font-extrabold  my-5 tracking-tight">
          Blogs
        </h1>
        <p className="text-lg font-semibold tracking-wide">
          A place to read, write, and deepen your understanding
        </p>
      </div>

      <div className="flex flex-wrap gap-16 p-10 ">
        {" "}
        {/* Wrapper div for right side content */}
        {posts.map((post) => (
          <Link to={`/posts/${post._id}`} className=" mb-6" key={post._id}>
            <span className="absolute bg-white rounded-lg p-[4px] text-[10px] m-2 tracking-wide">
              {post.category}
            </span>
            <img
              className="h-[45vh] w-[55vh] object-cover rounded-xl"
              src={post.coverImage}
              alt="cover"
            />
            <div className="relative">
              <p className="text-xl font-semibold my-2 mb-3 w-[55vh]">
                {post.title}
              </p>
              <div
                className="flex  items-center 
               "
              >
                <i className="ri-calendar-line"></i>
                <span className="text-xs">
                  {new Date(post.createdAt).toDateString()}
                </span>
                <i className="ri-time-line "></i>
                <span className="text-xs">{timeAgo(post.createdAt)}</span>
              </div>
              <Link
                to={`/posts/${post._id}`}
                className="absolute -bottom-4 my-6   tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black"
              >
                Read More
                <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
