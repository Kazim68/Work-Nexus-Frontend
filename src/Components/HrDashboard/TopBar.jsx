// src/components/TopBar.js
import React from "react";
import profileImg from "../../assets/Landing Page Icons/profile.png"; // Update with your actual path

const TopBar = () => {
  return (
    <div className="flex justify-end items-center w-full px-10 py-6">
      <div className="flex items-center space-x-4">
        <span className="text-white text-lg font-medium">Hi, HR ka Banda</span>
        <img
          src={profileImg}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-orange-400 object-cover"
        />
      </div>
    </div>
  );
};

export default TopBar;
