import React from 'react';
import bgAim from '../../../assets/Landing Page Icons/Background Pics/2052-3-1.jpg';
import Navbar from "../Navbar"

const Aim = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative"
      style={{ backgroundImage: `url(${bgAim})` }}
    >
    <Navbar/>
      {/* Top Orange Line */}
      <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-orange-500" />

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full max-w-6xl">

          {/* Reusable Box Component with Diagonal Corners */}
          {["Our Aim", "Our Values", "Our Strategy"].map((text, i) => (
            <div
              key={i}
              className="relative w-40 h-40 md:w-48 md:h-48 bg-[#1f1f1f] rounded-xl border-2 border-orange-500 flex items-center justify-center text-center overflow-hidden"
            >
              {/* Top-left Diagonal */}
              <div
                className="absolute w-12 h-12 bg-[#777978] transform rotate-45 -top-6 -left-6"
              ></div>

              {/* Bottom-right Diagonal */}
              <div
                className="absolute w-12 h-12 bg-[#777978] transform rotate-45 -bottom-6 -right-6"
              ></div>

              <span className="text-orange-400 text-lg font-semibold z-10">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Orange Line */}
      <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-orange-500" />
    </div>
  );
};

export default Aim;
