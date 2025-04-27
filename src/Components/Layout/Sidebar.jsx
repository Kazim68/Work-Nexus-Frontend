import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegClock, FaRegFileAlt, FaRegCalendarCheck, FaRegClipboard,
  FaRegQuestionCircle, FaThLarge, FaRegBell
} from "react-icons/fa";
import {
  MdOutlineWork, MdKeyboardArrowDown, MdKeyboardArrowUp,
} from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import NotificationsModal from "./NotificationsModal";
import { useNotifications } from "../../contexts/NotificationContext";
import { useSelector } from "react-redux";
import socket from '../../socket';


const menuItems = [
  { name: "Dashboard", icon: <FaThLarge />, link: "/dashboard" },
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
  {
    name: "Notifications",
    icon: <FaRegBell />,
    action: "open-notifications",
    badge: 3
  }

];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const { unreadCount } = useNotifications();
  const { data } = useSelector((state) => state.user);
  const employeeId = data.employee._id;

  const navigate = useNavigate();

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigation = (link) => {
    navigate(link);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  };

  useEffect(() => {
    if (data?.employee?._id) {
      socket.emit('register', data.employee._id);
      console.log("Socket registered for employee ID:", data.employee._id);
    }
  }, [data?.employee?._id]);

  return (
    <>
      {/* Sidebar positioned below the navbar */}
      <div
        className={`fixed left-0 text-white bg-[#] shadow-lg p-4 w-56 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <div
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#3f3d3d]  cursor-pointer"
                  onClick={() => {
                    if (item.dropdown) {
                      toggleDropdown(index);
                    } else if (item.action === "open-notifications") {
                      setShowNotifications(true);
                    } else {
                      handleNavigation(item.link);
                    }
                  }}

                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                  {item.name === "Notifications" && unreadCount > 0 && (
                    <span className="ml-2 bg-amber-600 text-white text-xs rounded-full px-2 py-0.5">
                      {unreadCount}
                    </span>
                  )}

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

      {showNotifications && (
        <NotificationsModal onClose={() => setShowNotifications(false)} />
      )}


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
