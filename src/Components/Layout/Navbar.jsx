import React from "react";
import { MdMenu } from "react-icons/md";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white p-4 flex items-center justify-between z-50">
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="text-2xl md:hidden">
          <MdMenu />
        </button>
        <img
            src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
            alt="HRM Logo"
            className="w-10 h-10"
          />
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-gray-700">Hi, Malick Barr</span>
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
