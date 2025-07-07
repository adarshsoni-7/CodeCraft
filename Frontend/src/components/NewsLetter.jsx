import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";

const NewsLetter = ({ newsletterPanel, setNewsletterPanel }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const newsletterRef = useRef(null);
  const navigate = useNavigate();

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (newsletterPanel) {
      gsap.to(newsletterRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8
      });
    } else {
      gsap.to(newsletterRef.current, {
        scale: 0,
        opacity: 0,
         duration: 0.5
      });
    }
  }, [newsletterPanel]);
  return (
    <div>
      <div
        ref={newsletterRef}
        className="bg-[rgba(0,0,0,0.4)]  h-[100vh] w-full z-50 fixed top-0 scale-0"
      >
        <div className="bg-white h-4/6 -translate-x-[50%] -translate-y-[50%] top-[50%] left-[50%] absolute p-16 rounded-2xl">
          <i
            className="ri-close-large-line text-lg absolute right-8 top-5 cursor-pointer"
            onClick={() => setNewsletterPanel(false)}
          ></i>
          <h2 className="text-4xl tracking-normal font-extrabold text-center mb-6">
            Join the community — Get Updates and Tips
          </h2>
          <p className="text-[17px] text-center font-medium">
            Regular updates ensure that readers have access to fresh
            perspectives, making Poster a must-read.
          </p>

          {loading ? (
            <div className=" absolute flex flex-col items-center right-[69%] top-[65%]  z-50">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500 absolute left-[52vh] top-2"></div>
            </div>
          ) : (
            <>
              <button
                onClick={handleSendingEmail}
                className="z-50 bg-[#1d1c1c] text-white absolute top-[67%] right-24  tracking-wide border-[1px] border-[#c2c1c1ec] text-[13px] font-semibold p-2 px-8 rounded-lg transition-all duration-[.7s] hover:text-white hover:bg-black"
              >
                Submit
              </button>
            </>
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-4 w-[78%] rounded-xl focus:outline-none absolute top-[65%] border-[1px] border-gray-200  placeholder:text-[#2c2b2b] "
            type="email"
            placeholder="Email address"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
