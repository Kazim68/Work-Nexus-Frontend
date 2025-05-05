import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Work_Nexus_Logo from '../../assets/Landing Page Icons/Work_Nexus_Logo.png';
import { getUserInfo } from '../../utils/getUserInfo.js';
import { useSelector } from "react-redux";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown after navigation
  };

  const { data } = useSelector((state) => state.user);

  return (
    <div className="fixed top-0 left-0 w-full p-4 flex items-center justify-between z-50 shadow-md">
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="text-2xl md:hidden">
          <MdMenu className="text-white" />
        </button>
        {/* Apply the logo with proper size */}
        <img
          src={Work_Nexus_Logo}
          alt="HRM Logo"
          className="w-30" // Adjust size and ensure the logo scales properly
        />
      </div>

      {/* Profile Section with Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 text-amber-600 focus:outline-none"
        >
          <span>Hi, {data?.employee?.firstName} {data?.employee?.lastName}</span>
          <FaChevronDown className="text-amber-600" />
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 shadow-lg rounded-lg border">
            <button
              onClick={() => handleNavigation("/profile-setting")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-amber-100"
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
