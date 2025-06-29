import React from 'react'
import usePost from '../context/usePost';

const BelowNavbarContent = () => {
  const { post } = usePost();
  return (
    <div>
      <div className="h-min-[40vh] bg-[#e6e2e2e8] p-4 flex justify-between items-center py-28 -mt-3 mb-36 relative -left-6  w-[98vw]">
        <div>
          <h1 className="text-8xl font-extrabold w-[60%] my-5 tracking-tight">
            Global Stories & Articles
          </h1>
          <p className="text-sm font-semibold tracking-wide">
            A place to read, write, and deepen your understanding
          </p>
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
            <p>{post[0]?.likes == 1 ? "Hello": "Bhak!"}</p>
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
    </div>
  );
}

export default BelowNavbarContent
