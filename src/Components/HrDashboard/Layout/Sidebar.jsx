import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegClock, FaRegFileAlt, FaRegCalendarCheck, FaRegClipboard,
  FaRegQuestionCircle, FaThLarge,
} from "react-icons/fa";
import {
  MdOutlineWork, MdKeyboardArrowDown, MdKeyboardArrowUp,
} from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import logo from "../../../assets/Landing Page Icons/HRM-Logo.png"

const menuItems = [
  { name: "Dashboard", icon: <FaThLarge />, link: "/hr-dashboard" },
  {
    name: "My Project",
    icon: <MdOutlineWork />,
    dropdown: [
      { name: "Subproject 1", link: "/hr-subproject-1" },
      { name: "Subproject 2", link: "/hr-subproject-2" }
    ]
  },
  {
    name: "Attendance",
    icon: <FaRegCalendarCheck />,
    dropdown: [
      { name: "Check-in", link: "/hr-check-in" },
      { name: "Check-out", link: "/hr-check-out" }
    ]
  },
  {
    name: "Leave",
    icon: <IoMdPerson />,
    dropdown: [
      { name: "Apply Leave", link: "/hr-apply-leave" },
      { name: "Leave Status", link: "/hr-leave-status" }
    ]
  },
  { name: "TimeSheet", icon: <FaRegClock />, link: "/hr-timesheet" },
  { name: "My Payroll", icon: <FaRegFileAlt />, link: "/hr-payroll" },
  { name: "Help Desk", icon: <FaRegQuestionCircle />, link: "/hr-help-desk" },
  { name: "Company Policies", icon: <FaRegClipboard />, link: "/hr-company-policies" },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigation = (link) => {
    navigate(link);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Sidebar positioned below the navbar */}
      <div
        className={`fixed left-0 text-white bg-[#333334] shadow-lg p-4 w-48 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <nav>
          {/* HRM Logo */}
          <div className="flex justify-center items-center mb-4">
            <img src={logo} alt="HRM Logo" className="w-55 h-50" />
          </div>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <div
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#3f3d3d]  cursor-pointer"
                  onClick={() => (item.dropdown ? toggleDropdown(index) : handleNavigation(item.link))}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                  {item.dropdown && (
                    <span className="ml-auto text-lg">
                      {openDropdown === index ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                    </span>
                  )}
                </div>
                {item.dropdown && openDropdown === index && (
                  <ul className="ml-7 mt-1">
                    {item.dropdown.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="p-2 rounded-lg hover:bg-[#3f3d3d] hover:text-amber-600 cursor-pointer"
                        onClick={() => handleNavigation(subItem.link)}
                      >
                        <span className="block text-white text-sm">{subItem.name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay when Sidebar is open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#212020] bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
