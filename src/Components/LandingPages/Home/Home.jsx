import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <div className="relative w-full min-h-screen overflow-hidden" id="home">
      <Navbar navBg={navBg} navLinkColor="text-black" />

      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: "grayscale(100%)",
        }}
      ></div>

      <div className="absolute bottom-0 right-0 w-full h-full z-10 pointer-events-none">
        <svg
          viewBox="0 0 500 500"
          preserveAspectRatio="none"
          className="absolute bottom-0 right-0 w-[50%] h-[100%]"
        >
          <path d="M500,0 Q400,300 0,500 L500,500 Z" fill="#f97316" />
        </svg>
      </div>

      <div className="relative z-10 pt-[55vh] px-10 flex flex-col gap-4 w-1/2">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-3xl font-light"
        >
          Your All in One
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          className="text-orange-500 text-6xl font-bold"
        >
          HR & Payroll
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-3xl font-light"
        >
          Management Solution
        </motion.h2>

        <button
          className="relative bg-orange-500 text-white w-40 h-12 rounded-md hover:bg-[#777987] transition duration-300 font-semibold shadow-md"
        >
          <span className="relative z-10 inline-block text-center w-full text-sm md:text-xl">
            Get Started
          </span>
          <div
            className="absolute inset-0 bg-[#777878] rounded-md"
            style={{
              clipPath: 'polygon(80% 0%, 100% 0%, 100% 100%, 60% 100%)',
              left: '40%',
            }}
          ></div>
        </button>

      </div>

      <div className="absolute bottom-8 right-8 z-10 text-white font-bold text-2xl text-right mr-6 mb-6">
        <p>SEAMLESS.</p>
        <p>FAST.</p>
        <p>RELIABLE.</p>
      </div>
    </div>
  );
};

export default Home;
