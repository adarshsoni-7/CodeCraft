import NavBar from "./navbar/NavBar";
import { Link } from "react-router-dom";
import useUser from "../context/useUser";
import { useState } from "react";
import timeAgo from "../utils/ExactTimeRead";
import axios from "axios";
import { useEffect } from "react";

const UserProfilePage = () => {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const totalViews = userPosts.reduce(
    (acc, post) => acc + (post.viewedBy?.length || 0),
    0
  );

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
        setUserPosts(data);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    fetchUserPosts();
  }, [user?._id]);
  return (
    <div>
      <NavBar />

      <div className="flex justify-between items-start px-16 mt-12 ">
        <div className="w-[50%] relative">
          <div className="flex">
            <div>
              <img
                className="h-[25vh] w-[25vh] rounded-full relative "
                src={user?.profilePicture}
                alt=""
              />

              <p className="font-semibold text-2xl  ">{user?.fullname}</p>
            </div>

            <div className="mt-8 absolute left-[25%]">
              <span className="tracking-wide text-sm font-semibold mr-8 p-1 px-4 rounded-lg text-black ">
                Followers
              </span>{" "}
              <span className="tracking-wide text-sm font-semibold mr-8 p-1 px-4 rounded-lg text-black ">
                Following
              </span>{" "}
              <span className="tracking-wide text-sm font-semibold mr-8 p-1 px-4 rounded-lg text-black ">
                Views Reached
              </span>{" "}
              <div>
                <span className=" absolute font-medium text-[16px] left-[8%]  my-4 ">
                  {user?.followers.length}
                </span>
                <span className=" absolute font-medium text-[16px] left-[39%] my-4  ">
                  {user?.followings.length}
                </span>
                <span className=" absolute font-medium text-[16px] left-[74%]  my-4 ">
                  {totalViews}
                </span>
              </div>
            </div>
          </div>

          <Link to={"/users/edit"}>
            <h4 className="my-12 font-semibold text-lg p-2 px-6 border-[1px] border-gray-200 inline-block rounded-xl text-center">
              Edit profile
            </h4>
          </Link>
          <h5 className="font-semibold text-lg">Bio</h5>
          <p className="text-sm text-gray-800 w-[40%] ">{user?.bio}</p>
        </div>

        <div className="w-[50%]">
          <div className="my-2">
            <h4 className="font-semibold text-2xl relative">Your Articles</h4>
            {}
            <Link to={"/posts/publish"}>
              <button className="top-[16%] left-[75%] absolute tracking-wide border-[1px] border-[#c2c1c1ec] text-[14px] font-semibold p-2 px-5 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
                Publish Blog
              </button>
            </Link>
          </div>

          <div className="flex gap-[55vh] flex-wrap relative top-28">
            {userPosts.slice(0, 2).map((article) => (
              <Link to={`/posts/${article._id}`} key={article._id}>
                <div key={article._id} className="w-[50%] absolute">
                  <span className="absolute bg-white rounded-full py-1 px-2 text-[#161515] text-[10px] m-2 tracking-wider z-20 font-semibold">
                    {article?.category}
                  </span>
                  {article.coverImage && (
                    <img
                      className="rounded-lg h-[200px] w-full object-cover transition-transform hover:scale-[1.1]"
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
                </div>
              </Link>
            ))}

            {userPosts.length > 2 && (
              <Link to={"/show/posts"}>
                <button className="-top-20 -right-[2%] absolute my-4 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-4 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
                  View All Blogs
                  <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
