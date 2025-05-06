// src/components/TopBar.js
import React from "react";
import { useLocation } from "react-router-dom"; // To detect current route
import profileImg from "../../assets/Landing Page Icons/profile.png"; // Update your path

const TopBar = () => {
  const location = useLocation();

  // Map route paths to page titles
  const routeTitles = {
    "/dashboard": "Dashboard",
    "/leave-approval": "Leave / Leave Approval",
    "/attendance": "Attendance",
    "/helpdesk": "HelpDesk",
    "/payslip": "Pay Slip",
    '/':'Employee Payroll',
    // Add more routes here as needed
  };

  // Get the title based on current path
  const pageTitle = routeTitles[location.pathname] || "Page";

  return (
    <div className="flex justify-between items-center w-full px-10 py-6">
      {/* Left side (Dynamic Page Title) */}
      <div className="text-white text-2xl font-semibold">
        {pageTitle}
      </div>

      {/* Right side (Greeting and Profile Image) */}
      <div className="flex items-center space-x-4">
        <span className="text-white text-lg font-medium">Hi, Employee ka Banda</span>
        <img
          src={profileImg}
          alt="Profile"
          className="w-16 h-16 rounded-full border-2 border-orange-400 object-cover"
        />
      </div>
    </div>
  );
};

export default TopBar;
