import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import usePost from '../context/usePost';
import timeAgo from '../utils/ExactTimeRead';



const RecentPost = () => {
  const { post, setPost } = usePost();
  // const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
       
      setPost(res.data);
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
        setPost(updatedPost.data);
      } catch (err) {
        console.error("Failed to fetch views:", err);
      }
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
          {post[0] && (
            <Link
              onClick={() => fetchView(post._id)}
              to={`/posts/${post[0]._id}`}
              className="relative pb-4 h-[60vh]"
            >
              {" "}
              {/* Div of left side content */}
              <span className="absolute bg-white rounded-full   py-1 px-2 text-[#161515] text-[11px] m-2  tracking-wide">
                {post[0].category}
              </span>
              <img
                className="h-[50vh] w-[80vh] object-cover rounded-xl"
                src={post[0].coverImage}
                alt=""
              />
              <div>
                <p className="text-xl font-semibold my-2 mb-3 w-[80vh]">
                  {post[0].title}
                </p>
                <div className="flex flex-wrap items-center justify-evenly w-[80vh]">
                  <i className="ri-user-line"></i>
                  <span className="text-xs text-left -ml-12   ">
                    {post[0].postedBy?.fullname}
                  </span>
                   
                  <i className="ri-time-line -ml-2"></i>
                  <span className="text-xs text-left mb-0 -ml-12">
                    {timeAgo(post[0].createdAt)}
                  </span>
                  <i className="ri-heart-line -ml-4"></i>
                  <span className="text-xs text-left mb-0 -ml-12">
                    {post[0].likes}{" "}
                  </span>

                  <i className="ri-eye-line -ml-4"></i>
                  <span className="text-xs text-left mb-0 -ml-12">
                    {post[0].views}
                  </span>
                </div>{" "}
              </div>
              <Link
                to={`/posts/${post[0]._id}`}
                 
              >
                <button className="absolute -bottom-[22%] tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">Read More <i className="   ri-arrow-right-fill text-[13px] ml-1"></i></button>
                 
                
              </Link>
            </Link>
          )}
          <div className="">
            {" "}
            {/* Wrapper div for right side content */}
            {Array.isArray(post) && post?.slice(1, 4).map((p) => (
              <Link
                onClick={() => fetchView(p._id)}
                to={`/posts/${p._id}`}
                className="flex mb-6"
                key={p._id}
              >
                <span className="absolute bg-white rounded-lg p-[4px] text-[10px] m-2 tracking-wide">
                  {p.category}
                </span>
                <img
                  className="h-[25vh] w-[35vh] object-cover rounded-xl"
                  src={p.coverImage}
                  alt="cover"
                />
                <div className="ml-3 relative">
                  <p className="text-xl font-semibold my-2 mb-3 w-[80vh]">
                    {p.title}
                  </p>
                  <div className="flex flex-wrap items-center justify-between w-1/2">
                    <i className="ri-calendar-line"></i>
                    <span className="text-xs">
                      {new Date(p.createdAt).toDateString()}
                    </span>
                    <i className="ri-time-line "></i>
                    <span className="text-xs">{timeAgo(p.createdAt)}</span>
                    <i className="ri-heart-line"></i>
                    <span className="text-xs text-left mb-0">{p.likes}</span>

                    <i class="ri-eye-line"></i>
                    <span className="text-xs text-left mb-0">{p.views}</span>
                  </div>
                  <Link
                    to={`/posts/${p._id}`}
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
