import React from 'react';
import bgAim from '../../../assets/Landing Page Icons/Background Pics/2052-3-1.jpg';
import Navbar from "../Navbar";

const Aim = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative"
      style={{ backgroundImage: `url(${bgAim})` }}
    >
      <Navbar />

      {/* Top Orange Line */}
      <div className="absolute top-[10%] sm:top-[12%] md:top-[15%] left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-orange-500" />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 w-full max-w-6xl">

          {/* Reusable Box Component with Diagonal Corners */}
          {["Our Aim", "Our Values", "Our Strategy"].map((text, i) => (
            <div
              key={i}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 bg-[#1f1f1f] rounded-xl border-2 border-orange-500 flex items-center justify-center text-center overflow-hidden transition-transform hover:scale-105"
            >
              {/* Top-left Diagonal */}
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-[#777978] transform rotate-45 -top-6 -left-6" />

              {/* Bottom-right Diagonal */}
              <div className="absolute w-10 h-10 sm:w-12 sm:h-12 bg-[#777978] transform rotate-45 -bottom-6 -right-6" />

              <span className="text-orange-400 text-base sm:text-lg md:text-xl font-semibold z-10">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Orange Line */}
      <div className="absolute bottom-[10%] sm:bottom-[12%] md:bottom-[15%] left-1/2 transform -translate-x-1/2 w-4/5 h-1 bg-orange-500" />
    </div>
  );
};

export default Aim;
