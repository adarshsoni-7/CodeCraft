import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendingEmail = async (e) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/email/subscribe`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 200) {
        console.log("Email sent successfully");
        setEmail("");
        navigate("/home");
      }
    } catch (error) {
      console.log("Error sending email");
    }

    finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="h-min-[40vh] bg-black px-14 flex justify-between items-center py-28 mt-5 mb-28 rounded-2xl relative">
        <div>
          <h1 className="text-4xl font-extrabold w-[60%] my-5 tracking-tight text-white">
            Join the community — Get Updates and Tips
          </h1>
          <p className="text-sm font-semibold tracking-wide w-[70%] text-white my-2 mb-6">
            Regular updates ensure that readers have access to fresh
            perspectives, making Poster a must-read.
          </p>
          {loading ? (
            <div className=" absolute flex flex-col items-center right-[69%] top-[65%]">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <>
              <button
                onClick={handleSendingEmail}
                className="bg-[#1d1c1c] text-white left-[25%] bottom-[26%] absolute tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-6 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black"
              >
                Submit
              </button>
             
            </>
          )}
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 py-4 w-1/2 rounded-xl focus:outline-none"
                type="email"
                placeholder="Email address"
              />
        </div>

        <div className="bg-white p-4 absolute right-20 z-30 rounded-xl">
          <span className="absolute bg-white rounded-full py-1 px-2 text-[#403f3f] text-[11px] m-2 font-semibold tracking-wide">
            Entertainment
          </span>
          <img
            className="h-[40vh] w-[60vh] rounded-xl"
            src="https://images.unsplash.com/photo-1749880783183-0a15dfa9e0c0?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="random0=-design-img"
          />
          <p className="text-[14px] font-semibold my-2 mb-3">
            How to get hired in 2025
          </p>
          <div className="flex items-center justify-between">
            <i className="ri-calendar-line"></i>
            <span className="text-xs text-left ml-0">September 22, 2003</span>
            <i className="ri-time-line"></i>
            <span className="text-xs text-left ml-0">5 mins read</span>
            <button className="tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
              Read More<i className="ri-arrow-right-fill text-[13px] ml-1"></i>
            </button>
          </div>{" "}
        </div>

        <div className="bg-white p-4 absolute right-20 z-20 rotate-[5deg] translate-x-4 translate-y-1 rounded-xl">
          <span className="absolute bg-white rounded-full py-1 px-2 text-[#403f3f] text-[11px]  m-2  tracking-wide">
            Social Issues
          </span>
          <img
            className="h-[40vh] w-[60vh] rounded-xl"
            src="https://plus.unsplash.com/premium_photo-1748193468691-494891c77dfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
            alt="random0=-design-img"
          />
          <p className="text-[14px] font-semibold my-2 mb-3">
            How to get hired in 2025
          </p>
          <div className="flex items-center justify-between">
            <i className="ri-calendar-line"></i>
            <span className="text-xs text-left ml-0">September 22, 2003</span>
            <i className="ri-time-line"></i>
            <span className="text-xs text-left ml-0">5 mins read</span>
            <button className="tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
              Read More<i className="ri-arrow-right-fill text-[13px] ml-1"></i>
            </button>
          </div>{" "}
        </div>

        <div className="bg-white p-4 absolute right-20 z-10 rotate-[10deg] translate-x-7 translate-y-1 rounded-xl">
          <span className="absolute bg-white rounded-full py-1 px-2 text-[#403f3f] text-[11px]  m-2  tracking-wide">
            Travel & Culture
          </span>
          <img
            className="h-[40vh] w-[60vh] rounded-xl"
            src="https://images.unsplash.com/photo-1743535370909-adb4090385a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D"
            alt="random0=-design-img"
          />
          <p className="text-[14px] font-semibold my-2 mb-3">
            How to get hired in 2025
          </p>
          <div className="flex items-center justify-between">
            <i className="ri-calendar-line"></i>
            <span className="text-xs text-left ml-0">September 22, 2003</span>
            <i className="ri-time-line"></i>
            <span className="text-xs text-left ml-0">5 mins read</span>
            <button className="tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
              Read More<i className="ri-arrow-right-fill text-[13px] ml-1"></i>
            </button>
          </div>{" "}
        </div>
      </div>

      <div className="flex justify-around items-start p-12 mb-32">
        <div>
          <img
            className="h-[90vh] w-[90vh] rounded-xl"
            src="https://cdn.prod.website-files.com/6728d153e4ac58f8ba1fda95/672a147372c55de6169a2f69_about-thumb-1-p-500.jpg"
            alt=""
          />
        </div>
        <div>
          <h2 className="font-extrabold text-3xl tracking-tight w-[60vh] mb-12">
            About us and why we write for you?
          </h2>
          <div className="flex gap-5">
            <img
              className="h-[40vh] w-[40vh] rounded-xl"
              src="https://cdn.prod.website-files.com/6728d153e4ac58f8ba1fda95/672a1473cb653be56d4781fb_about-thumb-2-p-500.jpg"
              alt=""
            />
            <img
              className="h-[40vh] w-[40vh] rounded-xl"
              src="https://cdn.prod.website-files.com/6728d153e4ac58f8ba1fda95/672a14734c670321eb7f6e4a_about-thumb-3-p-500.jpg"
              alt=""
            />
          </div>
          <p className="w-[80vh] text-sm text-gray-500 font-medium mt-10">
            Where technology meets lifestyle and business insights. Our blog is
            dedicated to delivering the latest trends, informative articles, and
            expert opinions on a diverse range of topics.
          </p>
          <button className=" my-6 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 px-3 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
            Read More
            <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
