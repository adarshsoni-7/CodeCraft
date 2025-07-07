import React from "react";
import usePost from "../context/usePost";
import { Link } from "react-router-dom";
import timeAgo from "../utils/ExactTimeRead";

const BelowNavbarContent = () => {
  const { post } = usePost();

   

  return (
    <div className="overflow-x-hidden"> 
     {Array.isArray(post) && post
        .filter((post) => post.views > 1)
        .slice(0, 1)
        .map((post) => (
          <Link to={`/posts/${post._id}`} key={post?._id}> 
          <div className="bg-white p-4 absolute right-20 top-28 z-30 rounded-xl mt-6 mr-4">
            <span className="absolute bg-white rounded-full py-1 px-2 text-[#403f3f] text-[11px] m-2 font-semibold tracking-wide">
              Trending
            </span>
            <span className=" right-4 absolute bg-white rounded-full py-1 px-3 text-[#403f3f] text-xs m-2 font-semibold tracking-wide">
              <i className="ri-eye-line text-sm mr-2"> </i>
              {post.views} 
            </span>
            <img
              className="h-[40vh] w-[60vh] rounded-xl"
              src={post.coverImage}
              alt="random0=-design-img"
            />
            <p className="text-[14px] font-semibold my-2 mb-3 w-[60vh]">{post.title}</p>
            <div className="flex items-center justify-between">
               
              <span className="text-xs text-left ml-0 w-[30%]">
                {timeAgo(post.createdAt)}
              </span>
              <i className="ri-heart-fill text-red-500"></i>
              <span className="text-xs text-left ml-0 w-[10%]">
                {" "}
                {post.likes}
              </span>
              <i className="ri-eye-fill  "></i>
              <span className="text-xs text-left ml-0 w-[10%]">
                {" "}
                {post.views}
              </span>
              <button className="tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
                Read More
                <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
              </button>
            </div>{" "}
          </div>
          </Link> 
        ))}
 
      
      {Array.isArray(post) && post.filter((post) => post.likes === 1)
        .slice(0, 1)
        .map((post) => (
          <Link to={`/posts/${post._id}`} key={post?._id}>
          <div className="bg-white p-4 absolute right-20 top-[16%] z-20 rounded-xl mt-6 mr-4 rotate-[5deg]   translate-x-3 translate-y-2">
            <span className="absolute bg-white rounded-full py-1 px-2 text-[#403f3f] text-[11px] m-2 font-semibold tracking-wide">
              Trending
            </span>
            <span className=" right-4 absolute bg-white rounded-full py-1 px-3 text-[#403f3f] text-xs m-2 font-semibold tracking-wide">
              <i className="ri-heart-fill text-sm mr-2 text-red-500"> </i>
              {post.likes}
            </span>
            <img
              className="h-[40vh] w-[60vh] rounded-xl"
              src={post.coverImage}
              alt="random0=-design-img"
            />
            <p className="text-[14px] font-semibold my-2 mb-3 w-[60vh]">{post.title}</p>
           <div className="flex items-center justify-between">
               
              <span className="text-xs text-left ml-0 w-[30%]">
                {timeAgo(post.createdAt)}
              </span>
              <i className="ri-heart-fill text-red-500"></i>
              <span className="text-xs text-left ml-0 w-[10%]">
                {" "}
                {post.likes}
              </span>
              <i className="ri-eye-fill  "></i>
              <span className="text-xs text-left ml-0 w-[10%]">
                {" "}
                {post.views}
              </span>
              <button className="tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
                Read More
                <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
              </button>
            </div>{" "}
          </div></Link>
           
        ))}
      <div className="h-min-[40vh] bg-[#e6e2e2e8] p-8  flex justify-between items-center py-32  mt-8 mb-36 w-[100vw]">
        <div>
          <h1 className="text-8xl font-extrabold w-[60%] my-5 tracking-tight">
            Global Stories & Articles
          </h1>
          <p className="text-sm font-semibold tracking-wide">
            A place to read, write, and deepen your understanding
          </p>
        </div>
      </div>
    </div>
  );
};

export default BelowNavbarContent;
