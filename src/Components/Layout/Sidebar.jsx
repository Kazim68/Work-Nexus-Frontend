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

const menuItems = [
  { name: "Dashboard", icon: <FaThLarge />, link: "/" },
  { 
    name: "My Project", 
    icon: <MdOutlineWork />, 
    dropdown: [
      { name: "Subproject 1", link: "/subproject-1" }, 
      { name: "Subproject 2", link: "/subproject-2" }
    ] 
  },
  { 
    name: "Attendance", 
    icon: <FaRegCalendarCheck />, 
    dropdown: [
      { name: "Check-in", link: "/check-in" }, 
      { name: "Check-out", link: "/check-out" }
    ] 
  },
  { 
    name: "Leave", 
    icon: <IoMdPerson />, 
    dropdown: [
      { name: "Apply Leave", link: "/apply-leave" }, 
      { name: "Leave Status", link: "/leave-status" }
    ] 
  },
  { name: "TimeSheet", icon: <FaRegClock />, link: "/timesheet" },
  { name: "My Payroll", icon: <FaRegFileAlt />, link: "/payroll" },
  { name: "Help Desk", icon: <FaRegQuestionCircle />, link: "/help-desk" },
  { name: "Company Policies", icon: <FaRegClipboard />, link: "/company-policies" },
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
        className={`fixed left-0 bg-white shadow-lg p-4 w-56 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <nav>
        <ul>  
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <div
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
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
                        className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleNavigation(subItem.link)}
                      >
                        <span className="block text-gray-700 text-sm">{subItem.name}</span>
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
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
