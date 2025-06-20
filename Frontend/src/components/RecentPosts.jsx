import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const RecentPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
       
      setPosts(res.data);
    };

    fetchPosts();
  }, []);
 

   const fetchView = async (postId) => {
      try {
        const token = localStorage.getItem("token"); // or from user context
  
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/${postId}/view`,
          {}, // empty body
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        const updatedPost = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts`
        );
        setPosts(updatedPost.data);
      } catch (err) {
        console.error("Failed to fetch views:", err);
      }
    };

  


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
      <div className="min-h-[100vh] mb-14">
        {" "}
        {/* Wrapper div for wrapper div of left and right content*/}
        <h1 className="w-full text-3xl font-extrabold tracking-tight recent-head">
          Recent Blogs
        </h1>
        <div className="relative my-5 flex justify-between">
          {" "}
          {/* Wrapper div for both left and right content */}
          {posts[0] && (
            <Link
              onClick={() => fetchView(posts._id)}
              to={`/posts/${posts[0]._id}`}
              className="relative pb-4 h-[60vh]"
            >
              {" "}
              {/* Div of left side content */}
              <span className="absolute bg-white rounded-full   py-1 px-2 text-[#161515] text-[11px] m-2  tracking-wide">
                {posts[0].category}
              </span>
              <img
                className="h-[50vh] w-[80vh] object-cover rounded-xl"
                src={posts[0].coverImage}
                alt=""
              />
              <div>
                <p className="text-xl font-semibold my-2 mb-3 w-[80vh]">
                  {posts[0].title}
                </p>
                <div className="flex flex-wrap items-center justify-evenly w-[80vh]">
                  <i className="ri-user-line"></i>
                  <span className="text-xs text-left ml-0">
                    {posts[0].postedBy?.fullname}
                  </span>
                  <i className="ri-calendar-line"></i>
                  <span className="text-xs text-left ml-0">
                    {new Date(posts[0].createdAt).toDateString()}
                  </span>
                  <i className="ri-time-line"></i>
                  <span className="text-xs text-left mb-0">
                    {timeAgo(posts[0].createdAt)}
                  </span>
                  <i className="ri-calendar-line"></i>
                  <span className="text-xs text-left mb-0">
                    {posts[0].likes}{" "}
                  </span>

                  <i class="ri-eye-line"></i>
                  <span className="text-xs text-left mb-0">
                    {posts[0].views}
                  </span>
                </div>{" "}
              </div>
              <Link
                to={`/posts/${posts[0]._id}`}
                className=" absolute -bottom-[16%] tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black"
              >
                Read More
                <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
              </Link>
            </Link>
          )}
          <div className="">
            {" "}
            {/* Wrapper div for right side content */}
            {posts.slice(1, 4).map((post) => (
              <Link
                onClick={() => fetchView(post._id)}
                to={`/posts/${post._id}`}
                className="flex mb-6"
                key={post._id}
              >
                <span className="absolute bg-white rounded-lg p-[4px] text-[10px] m-2 tracking-wide">
                  {post.category}
                </span>
                <img
                  className="h-[25vh] w-[35vh] object-cover rounded-xl"
                  src={post.coverImage}
                  alt="cover"
                />
                <div className="ml-3 relative">
                  <p className="text-xl font-semibold my-2 mb-3 w-[80vh]">
                    {post.title}
                  </p>
                  <div className="flex flex-wrap items-center justify-between w-1/2">
                    <i className="ri-calendar-line"></i>
                    <span className="text-xs">
                      {new Date(post.createdAt).toDateString()}
                    </span>
                    <i className="ri-time-line "></i>
                    <span className="text-xs">{timeAgo(post.createdAt)}</span>
                    <i className="ri-heart-line"></i>
                    <span className="text-xs text-left mb-0">{post.likes}</span>

                    <i class="ri-eye-line"></i>
                    <span className="text-xs text-left mb-0">{post.views}</span>
                  </div>
                  <Link
                    to={`/posts/${post._id}`}
                    className="absolute -bottom-4 my-6 ml-2 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black"
                  >
                    Read More
                    <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentPost
