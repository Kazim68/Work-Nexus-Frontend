import React, { useState } from "react";
import {
  FaRegClock, FaRegFileAlt, FaRegCalendarCheck, FaRegClipboard,
  FaRegQuestionCircle, FaThLarge,
} from "react-icons/fa";
import {
  MdOutlineWork, MdKeyboardArrowDown, MdKeyboardArrowUp,
} from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const menuItems = [
  { name: "Dashboard", icon: <FaThLarge />, link: "#" },
  { name: "My Project", icon: <MdOutlineWork />, link: "#", dropdown: ["Subproject 1", "Subproject 2"] },
  { name: "Attendance", icon: <FaRegCalendarCheck />, link: "#", dropdown: ["Check-in", "Check-out"] },
  { name: "Leave", icon: <IoMdPerson />, link: "#", dropdown: ["Apply Leave", "Leave Status"] },
  { name: "TimeSheet", icon: <FaRegClock />, link: "#" },
  { name: "My Payroll", icon: <FaRegFileAlt />, link: "#" },
  { name: "Help Desk", icon: <FaRegQuestionCircle />, link: "#" },
  { name: "Company Policies", icon: <FaRegClipboard />, link: "#" },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      {/* Sidebar positioned below the navbar */}
      <div
  className={`fixed left-0 bg-white shadow-lg p-4 w-48 transform ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <div
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => item.dropdown && toggleDropdown(index)}
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
                  <ul className="ml-4 mt-1">
                    {item.dropdown.map((subItem, subIndex) => (
                      <li key={subIndex} className="p-1 rounded-lg hover:bg-gray-200">
                        <a href="#" className="block text-gray-700 text-sm">{subItem}</a>
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
          className="fixed inset-0  bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
