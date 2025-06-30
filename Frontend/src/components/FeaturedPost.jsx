import React from "react";
import  usePost  from "../context/usePost";
import { Link } from "react-router-dom";

const FeaturedPost = () => {
  const {post} = usePost();
  return (
    <div className="p-6 mb-12">
      <h1 className="w-full text-3xl font-extrabold">Featured Blogs</h1>
      <div className="my-5 flex flex-wrap gap-8 justify-between">
        {post.map((item) => (
          <Link to={`/posts/${item._id}`} key={item._id}>
            <div>
          <span className="absolute bg-white rounded-full   py-1 px-2 text-[#161515] text-[11px] m-2  tracking-wide">
            {item.category}
          </span>
          <img
            className="h-[50vh] w-[60vh] object-cover rounded-xl"
            src={item.coverImage}
            alt=""
          />
          <div>
            <p className="text-xl font-semibold my-2 mb-3 w-[50vh]"> 
              {item.title}
            </p>
            <div className="flex flex-wrap items-center justify-evenly w-[50vh]">
              <i className="ri-calendar-line"></i>
              <span className="text-xs text-left ml-0">{new Date(item.createdAt).toLocaleDateString()}</span>
              <i className="ri-time-line"></i>
              <span className="text-xs text-left ml-0">5 mins read</span>
            </div>{" "}
            <button className=" my-6 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
              Read More
              <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
            </button>
          </div>
        </div></Link> 
         
        ))} 

        
      </div>
    </div>
  );
};

export default FeaturedPost;
