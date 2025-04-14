import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import bgImage from "../../../assets/Landing Page Icons/Background Pics/home page.jpg";

const Home = () => {
  const [navBg, setNavBg] = useState("bg-transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavBg("bg-black bg-opacity-80 shadow-md");
      } else {
        setNavBg("bg-transparent");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling globally
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // restore scroll on unmount
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden" id="home">
      <Navbar navBg={navBg} navLinkColor="text-black" />

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center grayscale z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Orange SVG Blob Overlay */}
      <div className="absolute bottom-0 right-0 w-full h-full z-10 pointer-events-none">
        <svg
          viewBox="0 0 500 500"
          preserveAspectRatio="none"
          className="absolute bottom-0 right-0 w-[50%] h-full"
        >
          <path d="M500,0 Q400,300 0,500 L500,500 Z" fill="#f97316" />
        </svg>
      </div>

      {/* Text Content */}
      <div className="relative z-10 pt-[45vh] px-6 sm:px-10 flex flex-col gap-4 w-full sm:w-3/4 lg:w-1/2">
        <h2 className="text-white text-2xl sm:text-3xl font-light opacity-0 animate-[fadeInDown_1s_ease-out_forwards]">
          Your All in One
        </h2>

        <h1 className="text-orange-500 text-4xl sm:text-5xl md:text-6xl font-bold opacity-0 animate-[fadeInLeft_1.2s_ease-out_forwards]">
          HR & Payroll
        </h1>

        <h2 className="text-white text-2xl sm:text-3xl font-light opacity-0 animate-[fadeInUp_1.2s_ease-out_forwards]">
          Management Solution
        </h2>

        <button className="relative bg-orange-500 text-white w-40 h-12 rounded-md hover:bg-[#777987] transition duration-300 font-semibold shadow-md mt-4">
          <span className="relative z-10 inline-block text-center w-full text-sm md:text-xl">
            Get Started
          </span>
          <div
            className="absolute inset-0 bg-[#777878] rounded-md"
            style={{
              clipPath: "polygon(80% 0%, 100% 0%, 100% 100%, 60% 100%)",
              left: "40%",
            }}
          ></div>
        </button>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-20 right-12 z-10 text-white font-bold text-2xl sm:text-4xl text-right animate-pulse">
        <p>SEAMLESS.</p>
        <p>FAST.</p>
        <p>RELIABLE.</p>
      </div>

      {/* Inline Tailwind Animations */}
      <style>
        {`
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInLeft {
            0% { opacity: 0; transform: translateX(-40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
