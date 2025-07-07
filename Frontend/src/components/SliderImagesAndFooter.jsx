import React from "react";

const SliderImagesAndFooter = () => {
  return (
    <div className="overflow-hidden">
      {/* <h1 className='text-3xl font-extrabold text-center'>Follow us on @codecraft</h1> */}
      {/* This is the parent div of sliding images */}
      {/* <div>
        <div>
          <img src="" alt="" />
          <div></div>
          <img src="" alt="" />
          <div></div>
          <img src="" alt="" />
          <div></div>
        </div>
      </div> */}

      <div className="h-[110vh] relative bg-black flex justify-between items-end   w-screen ">
        <div className="bg-white p-2 absolute rounded-xl -translate-x-2  -translate-y-40 object-cover rotate-[-15deg]">
          <span className="absolute bg-white rounded-full py-1 px-2 text-[#403f3f] text-[11px] m-2 font-semibold tracking-wide">
            Entertainment
          </span>
          <img
            className="h-[25vh] w-[45vh] rounded-xl object-cover"
            src="https://cdn.prod.website-files.com/6730614b3d201ddcf88f344b/6731af4baf81aa1052c7b189_card-thumb-2-p-500.jpg"
            alt="random0=-design-img"
          />
          <p className="text-[14px] font-semibold my-2 mb-3">
            How to get hired in 2025
          </p>
          <div className="flex items-center justify-around">
            <i className="ri-calendar-line"></i>
            <span className="text-xs text-left ml-0">September 22, 2003</span>
            <i className="ri-time-line"></i>
            <span className="text-xs text-left ml-0">5 mins read</span>
          </div>{" "}
          <button className="my-4 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
            Read More<i className="ri-arrow-right-fill text-[13px] ml-1"></i>
          </button>
        </div>

        <div className="text-center left-[25%] absolute top-[20%] ">
          <h1 className="text-white font-extrabold text-4xl  w-[65%] mx-auto my-0 mb-5">
            Stay in the know with our weekly newsletter
          </h1>
          <p className="text-center text-sm font-medium text-white w-[65%] mx-auto my-0 mb-8">
            Regular updates ensure that readers have access to fresh
            perspectives, making Poster a must-read.
          </p>
          <div className="text-center relative -left-24">
            <button className="bg-[#1d1c1c] text-white left-[49%] bottom-[26%] relative tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold  p-2 px-6 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
              Submit
            </button>
            <input
              className="px-4 py-3 w-1/2 rounded-xl"
              type="email"
              placeholder="Email address"
            />
          </div>
        </div>

        <div className="bg-white p-2 absolute rounded-xl right-2 -translate-x-2  -translate-y-40 object-cover rotate-[15deg]">
          <span className="absolute bg-white rounded-full py-1 px-2 text-[#403f3f] text-[11px] m-2 font-semibold tracking-wide">
            Entertainment
          </span>
          <img
            className="h-[25vh] w-[45vh] rounded-xl object-cover"
            src="https://cdn.prod.website-files.com/6730614b3d201ddcf88f344b/6731af4baf81aa1052c7b189_card-thumb-2-p-500.jpg"
            alt="random0=-design-img"
          />
          <p className="text-[14px] font-semibold my-2 mb-3">
            How to get hired in 2025
          </p>
          <div className="flex items-center justify-around">
            <i className="ri-calendar-line"></i>
            <span className="text-xs text-left ml-0">September 22, 2003</span>
            <i className="ri-time-line"></i>
            <span className="text-xs text-left ml-0">5 mins read</span>
          </div>{" "}
          <button className="my-4 tracking-wide border-[1px] border-[#c2c1c1ec] text-[12px] font-semibold p-2 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
            Read More<i className="ri-arrow-right-fill text-[13px] ml-1"></i>
          </button>
              </div>
              <h1 className="text-white text-9xl font-extrabold mx-auto my-0 tracking-tight">CodeCraft</h1>
              <p className="text-white absolute mx-4 my-2" >Designed by <span className="underline">Seth Adarsh</span></p> 
              <p className="text-white absolute mx-4 my-2 right-0">Powered by <span className="underline">Aditi Upadhyay</span></p> 
         
      </div>
    </div>
  );
};

export default SliderImagesAndFooter;
