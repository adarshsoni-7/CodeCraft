import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import timeAgo from "../../utils/ExactTimeRead";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="h-min-[40vh] bg-[#e6e2e2e8] p-24 py-32 -mt-3 mb-36 relative">
        <Link
          to={"/home"}
          className="text-3xl font-bold mb-24 absolute top-8 left-10"
        >
          CodeCraft
        </Link>
        <h1 className="text-8xl font-extrabold  my-5 tracking-tight">Blogs</h1>
        <p className="text-lg   tracking-wide">
          A place to read, write, and deepen your understanding
        </p>
      </div>

      <div className="flex flex-wrap gap-16 p-10  ">
        {" "}
        {/* Wrapper div for right side content */}
        {posts.map((post) => (
          <div className=" mb-6" key={post._id}>
            <span className="absolute bg-white rounded-lg p-[4px] text-[10px] m-2 tracking-wider font-semibold">
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
              <div  className="flex  items-center gap-2">              
                <span className="text-xs">{timeAgo(post.createdAt)}</span> 
                <i className="ri-eye-line "></i>  
                <span className="text-xs">{post.views}</span>
              </div>
              <Link to={`/posts/${post._id}`}>
                {" "}
                <button className="tracking-wide bor mt-6 border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
                  {" "}
                  Read More
                   <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
                </button>
                
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
