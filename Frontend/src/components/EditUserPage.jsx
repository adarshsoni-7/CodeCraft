import { Link, NavLink } from "react-router-dom";
import useUser from "../context/useUser";
import { useState } from "react"; 
import UpdateUserName from "./UpdateUsername"; 
import UpdateEmail from "./UpdateEmail"; 
import UpdatePassword from "./UpdatePassword";
import WriteBio from "./WriteBio";
import DeleteAllBlogs from "./DeleteAllBlogs";
 
const EditUserPage = () => {
  const { user} = useUser();
  const [showBanner, setShowBanner] = useState(true);
  const handleCloseBanner = () => {
    setShowBanner(false);
  };


  
  return (
    <div>
      <div className="relative -top-4 -left-4 w-screen mt-4">
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

          <div className="flex justify-between items-center gap-20 font-medium text-[14px]">
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
              to={"/contact"}
              className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
            >
              Contact
            </NavLink>
          </div>

          <Link to={"/users/profile"}>
            <img
              className="h-12 w-12 rounded-full relative left-4"
              src={user?.profilePicture}
              alt="Profile"
            />
            <p className="text-sm font-medium absolute text-center">
              {user?.fullname}
            </p>
          </Link>
        </div>
      </div>
      <div className="p-16">
        <h4 className="font-medium text-2xl mb-6">Edit Profile </h4>
        <form>
          <div>
            <UpdateUserName />            
            
            
           <UpdateEmail/>
           <UpdatePassword/>
            <WriteBio/>
            <h5 className="font-medium text-xl my-4 tracking-wide">
              Notification Preferences
            </h5>
            <DeleteAllBlogs />
            <Link to={`/users/${user?._id}/delete`}><button className=" my-6   tracking-wide border border-red-400 text-lg font-semibold p-2 px-6 rounded-lg transition duration-300 hover:text-white hover:bg-red-600 disabled:opacity-60">Delete Account</button></Link><br />
            <Link to={`/logout`}><button className=" my-6   tracking-wide border border-red-400 text-lg font-semibold p-2 px-6 rounded-lg transition duration-300 hover:text-white hover:bg-red-600 disabled:opacity-60">Log Out</button></Link>
          </div>
        </form>
       <Link to={"/users/profile"}><button className=" my-6   tracking-wide border border-red-400 text-lg font-semibold p-2 px-6 rounded-lg transition duration-300 hover:text-white hover:bg-red-600 disabled:opacity-60">Cancel</button></Link>  
      </div>
    </div>
  );
};

export default EditUserPage;
