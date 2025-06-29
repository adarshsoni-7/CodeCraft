import NavBar from "./navbar/NavBar";
import { Link, NavLink } from "react-router-dom";
import useUser from "../context/useUser";
import usePost from "../context/usePost";
import { useState } from "react";

const UserProfilePage = () => {
  const [showBanner, setShowBanner] = useState(true);
  const handleCloseBanner = () => {
    setShowBanner(false);
  };
  const { user } = useUser();
  const { post } = usePost();
  return (
    <div>
      <div className="relative -top-4  w-screen mt-4">
        {showBanner && (
          <div className="text-xs p-2 text-center bg-black text-white font-semibold relative w-full left-0 tracking-wider">
            Get weekly updates with our{" "}
            <Link to={"/newsletter"} className="underline">
              Newsletter
            </Link>
            <i
              className="ri-close-large-line absolute right-4 text-xs cursor-pointer"
              onClick={handleCloseBanner}
            ></i>
          </div>
        )}

        <div className="flex justify-around items-end ">
          <div>
            <Link to={"/home"} className="text-3xl font-bold mb-24">
              CodeCraft
            </Link>
          </div>

          <div className="flex justify-between items-end gap-20 font-medium text-[14px] pt-6">
            <NavLink
              id="nav-link-hover"
              to={"/blogs"}
              className="relative  transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
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
              to={"/logout"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              Sign Out
            </NavLink>
          </div>

          <Link to={"/posts/publish"}>
            <button className=" relative top-3 tracking-wide border-[1px] border-[#c2c1c1ec] text-[13px] font-semibold p-2 px-4 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
              Publish Blog
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-start px-16 ">
        <div className="w-[50%] relative">
          <img
            className="h-[25vh] w-[25vh] rounded-full relative left-24 "
            src={user?.profilePicture}
            alt=""
          />
          <p className="font-semibold text-2xl text-center">{user?.fullname}</p>
          <Link to={"/users/edit"}>
            <h4 className="font-semibold text-lg p-2 px-6 border-[1px] border-gray-200 inline-block rounded-xl text-center">
              Edit profile
            </h4>
          </Link>
          <h5>Bio</h5>
          <p className="text-sm text-gray-600 w-[40%] ">{user?.bio}</p>
        </div>

        <div className="w-[50%]">
  <h4 className="font-semibold text-2xl mt-6">Your Articles</h4>

  <div className="flex gap-4 flex-wrap relative my-12">
    {post.slice(1, 5).map((article) => (
      <div className="border-[1px] border-gray-200 p-4 rounded-lg w-[250px]">
        <span className="absolute bg-white rounded-full py-1 px-2 text-[#161515] text-[11px] m-2 tracking-wide">
          {article?.category}
        </span>
        {article.coverImage && (
          <img
            className="rounded-lg h-[150px] w-full object-cover"
            src={article.coverImage}
            alt="Cover"
          />
        )}
        <div>
          <p className="text-lg font-medium my-2 mb-3 w-full">
            {article?.title}
          </p>
          <div className="flex flex-wrap items-center justify-evenly">
            <i className="ri-calendar-line"></i>
            <span className="text-xs text-left ml-0">
              {new Date(article?.createdAt).toLocaleDateString()}
            </span>
            <i className="ri-time-line"></i>
            <span className="text-xs text-left ml-0">5 mins read</span>
          </div>
          <button className="my-4 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
            Read More
            <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
          </button>
        </div>
      </div>
    ))}
    {post.length > 4 && (
       <button className="-top-16 right-[16%] absolute my-4 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-4 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
        View All Articles
       <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
     </button>
    )} 
     
   
  </div>

   
</div>

      </div>
    </div>
  );
};

export default UserProfilePage;
