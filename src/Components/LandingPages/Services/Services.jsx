import React from 'react';
const bgServices = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Background%20Pics/HA21-04.png';
const service1 = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/1illustration-graphic-cartoon-character-of-team-work-free-vector.png';
const service2 = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/istockphoto-1134102363-612x612.jpg';
const checkmark = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Check.svg.png';
import Navbar from "../Navbar";

const Services = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white relative"
      style={{ backgroundImage: `url(${bgServices})` }}
    >
      <Navbar />
      {/* Main content area */}
      <main className="flex flex-col md:flex-row items-center justify-center p-8 pt-36 relative">
        {/* Left Side */}
        <div className="md:w-1/2 relative flex justify-center items-center">
          <div className="relative w-full max-w-md">

            {/* Top Orange Corner */}
            <div className="absolute top-0 left-0 md:w-24 md:h-28 w-16 h-20 border-t-4 border-l-4 border-orange-500 z-0"></div>

            {/* Bottom Orange Corner - moved slightly down */}
            <div className="absolute -bottom-6 right-0 md:w-24 md:h-28 w-16 h-20 border-b-4 border-r-4 border-orange-500 z-0"></div>

            {/* Top Image */}
            <img
              src={service1}
              alt="Illustration 1"
              className="w-[75%] object-contain relative z-10"
            />

            {/* Bottom Image - moved slightly up and left */}
            <img
              src={service2}
              alt="Illustration 2"
              className="w-[75%] object-contain relative z-0 mt-[-70px] transform translate-x-[3rem] md:translate-x-[5rem]"
            />
          </div>
        </div>



        {/* Right Side */}
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-4 text-center">
            WORK <span className="text-orange-500">NEXUS</span>
          </h1>
          <h2 className="text-2xl mb-4 text-center"><span className='text-orange-500'>Any Time.</span> Anywhere.</h2>
          <p className="mb-4 text-lg text-center">
            At Work Nexus, we offer an innovative HR and payroll solution that streamlines workforce management, automates complex HR tasks, and lets businesses focus on growth and their people.
          </p>

          {/* Services */}
          <ul className="space-y-2 px-4">
            <li className="flex items-center p-2">
              <img
                src={checkmark}
                alt="Checkmark"
                className="w-6 h-6 mr-2"
              />
              Scalable and secure solution for businesses of all sizes, from startups to enterprises.
            </li>
            <li className="flex items-center p-2">
              <img
                src={checkmark}
                alt="Checkmark"
                className="w-6 h-6 mr-2"
              />
              Streamline management of employee records, payroll, attendance, and more.
            </li>
            <li className="flex items-center p-2">
              <img
                src={checkmark}
                alt="Checkmark"
                className="w-6 h-6 mr-2"
              />
              Ensure accuracy, compliance, and efficiency with an easy-to-use platform.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Services;