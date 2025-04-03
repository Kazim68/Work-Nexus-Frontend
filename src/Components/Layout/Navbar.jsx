import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown after navigation
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white p-4 flex items-center justify-between z-50 shadow-md">
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

      {/* Profile Section with Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 text-gray-700 focus:outline-none"
        >
          <span>Hi, Malick Barr</span>
          <FaChevronDown className="text-gray-500" />
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">
            <button
              onClick={() => handleNavigation("/profile-setting")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              My Profile
            </button>
            <button
              onClick={() => handleNavigation("/forgot-password")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Forgot Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
