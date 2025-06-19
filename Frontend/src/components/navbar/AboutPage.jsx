import React from 'react'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <div>
      <div className="h-min-[40vh] bg-[#e6e2e2e8] p-24 py-32 -mt-3 mb-36 relative">
        <Link
          to={"/home"}
          className="text-3xl font-bold mb-24 absolute top-8 left-10"
        >
          CodeCraft
        </Link>
        <h1 className="text-8xl font-extrabold tracking-tight my-5">
          About CodeCraft
        </h1>
        <p className="text-lg font-semibold tracking-wide w-[62%]">
          At CodeCraft, we believe that knowledge fuels creativity. Our blog is
          designed to inspire and educate, offering deep dives into design
          techniques.
        </p>
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

      <div className="pl-24 relative">
        <h2 className="font-extrabold text-4xl tracking-tight  mb-12">
          Our mission & vision
        </h2>
        <p className="w-[43%] text-gray-600 mb-12  ">
          We’re passionate about pushing the boundaries of creativity and
          technology. Our platform is a go-to resource for web designers,
          developers, and digital marketers looking to enhance their skills and
          stay updated on the latest trends.
        </p>
        <p className="w-[39%] absolute right-12 top-[48%] text-gray-600">
          Our blog is designed to inspire and educate, offering deep dives into
          design practical solutions for real-world challenges. We aim to
          empower you with the insights and tools needed to transform your ideas
          into impactful digital experiences.
        </p>

        <img
          className=" w-[90vw] rounded-xl absolute left-16 my-14"
          src="https://cdn.prod.website-files.com/6728d153e4ac58f8ba1fda95/672e051cd52bd8476c206155_mission-1-p-1600.jpg"
          alt=""
        />
      </div>
      
 
    </div>
  );
}

export default AboutPage
