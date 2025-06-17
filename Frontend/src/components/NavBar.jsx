import React, {useState} from "react";
import { Link, NavLink } from "react-router-dom";
import useUser from "../context/useUser";
 

const NavBar = () => {
    const { user } = useUser();
    const [showBanner, setShowBanner] = useState(true);
    const handleCloseBanner = () => {
        setShowBanner(false);
    };
    
    
  return (
    <div className="relative -top-10 -left-10 w-screen mt-4">
      {showBanner && (
        <div className="text-sm p-3 text-center bg-black text-white font-semibold relative w-full left-0 tracking-wider">
          Get weekly updates with our{" "}
          <Link to={"/newsletter"} className="underline">
            Newsletter
          </Link>
          <i
            className="ri-close-large-line absolute right-4 text-lg cursor-pointer"
            onClick={handleCloseBanner}
          ></i>
        </div>
      )}

      <div className="flex justify-around items-end">
        <div>
          <Link to={"/home"} className="text-3xl font-bold mb-24">
            CodeCraft
          </Link>
        </div>

        <div className="flex justify-between items-center gap-20 font-semibold text-lg">
          <NavLink
            to={"/blogs"}
            className="transition-all duration-300 hover:scale-110 hover:text-[#3a3a3a]"
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

        <div className="">
          <img
            className="h-12 w-12 rounded-full relative left-4"
            src={user?.profilePicture || "/default-avatar.png"}
            alt="Profile"
          />
          <p className="text-sm font-medium absolute text-center">{user.fullname}</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
