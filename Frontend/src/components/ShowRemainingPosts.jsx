import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../context/useUser";
import axios from "axios";
import timeAgo from "../utils/ExactTimeRead";

const ShowRemainingPosts = () => {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/${user._id}/posts`,
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        const data = await res.data;
        console.log(data);
        setUserPosts(data);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    fetchUserPosts();
  }, [user?._id]);
  return (
    <div>
      <div className="h-min-[40vh] bg-[#e6e2e2e8] p-24 py-32 -mt-3 mb-36 relative">
        <Link
          to={"/home"}
          className="text-3xl font-bold mb-24 absolute top-8 left-10"
        >
          CodeCraft
        </Link>
        <h1 className="text-8xl font-extrabold  my-5 tracking-tight">
          Your Articles
        </h1>
      </div>

      <div className="flex flex-wrap gap-14">
        {userPosts.map((article) => (
               <Link to={`/posts/${article._id}`}>
                <div
                  key={article._id}
                  className="border-[1px] border-gray-300 p-4 rounded-lg w-[350px] my-16"
                >
                  <span className="absolute bg-white rounded-full py-1 px-2 text-[#161515] text-[11px] m-2 tracking-wide">
                    {article?.category}
                  </span>
                  {article.coverImage && (
                    <img
                      className="rounded-lg h-[250px] w-full object-cover"
                      src={article.coverImage}
                      alt="Cover"
                    />
                  )}
                  <div>
                    <p className="text-lg font-medium my-2 mb-3 w-full">
                      {article?.title}
                    </p>
                    <div className="flex flex-wrap items-center justify-evenly">
                      <i className="ri-heart-fill text-red-500"></i>
                      <span className="text-xs text-left ml-0 w-1/4">
                        {article.likes}
                      </span>
                      <i className="ri-eye-line"></i>
                      <span className="text-xs text-left ml-0 w-1/6">
                        {article.views}
                      </span>

                      <span className="text-xs text-left ml-0 ">
                        {timeAgo(article.createdAt)}
                      </span>
                    </div>
                    <button className="my-4 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
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

export default ShowRemainingPosts;
