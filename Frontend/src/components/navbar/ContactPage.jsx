import React from "react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <div>
      <div className="h-min-[40vh] bg-[#e6e2e2e8] p-24 py-32 -mt-3 mb-36 relative">
        <Link
          to={"/home"}
          className="text-3xl font-bold mb-24 absolute top-8 left-10"
        >
          CodeCraft
        </Link>
        <h1 className="text-8xl font-extrabold tracking-tight my-5">Contact</h1>
        <p className="text-lg font-medium tracking-wide w-[60%]">
          We'd love to hear from you! Whether you have a question, feedback, or
          would like to discuss a collaboration, feel free to reach out.
        </p>
      </div>

      <div className="px-24 flex items-center justify-between gap-6">
        <div>
          <h3 className="text-4xl font-extrabold tracking-tight my-5">
            Get in touch
          </h3>
          <p className="text-[15px] font-medium tracking-wide w-[60%] text-gray-600 my-8">
            Use the form below to send us a message, and we’ll get back to you
            as soon as we can.
          </p>

          <div className="border-[1px] border-gray-200 inline-block p-4 rounded-xl mb-8">
            <p className="text-[15px] font-medium tracking-wide w-[37%] text-gray-600">
              Email
            </p>
            <p className="text-lg font-medium tracking-wide w-[37%]  ">
              hello@codecraftmail.com
            </p>
          </div>

          <div className="border-[1px] border-gray-200  rounded-xl p-4   w-[12vw]">
            <p className="text-[15px] font-medium tracking-wide w-[37%] text-gray-600">
              Phone
            </p>
            <p className="text-lg font-medium tracking-wide w-[37%]  ">
              +1111111111
            </p>
          </div>
        </div>

        <div>
          <h4>Full Name</h4>
          <input
            className=" outline-none p-2 px-4 bg-gray-100 rounded-lg w-full   my-6 placeholder: text-sm "
            type="text"
            placeholder="Enter your name  "
          />
          <h4>Email Address</h4>
          <input
            className=" outline-none p-2 px-4 bg-gray-100 rounded-lg w-full my-6 placeholder: text-sm "
            type="text"
            placeholder="Enter your email address "
          />
          <h4>Message</h4>
          <textarea
            cols={50}
            rows={5}
            className=" outline-none p-2 px-4 bg-gray-100 rounded-lg w-full my-6 placeholder: text-sm "
            type="text"
            placeholder="Enter your message "
          ></textarea>

          <button className=" my-6 tracking-wide border-[1px] border-[#c2c1c1ec] text-base font-semibold p-3 px-8 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black">
           Send Message
            <i className="ri-arrow-right-fill text-[13px] ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
