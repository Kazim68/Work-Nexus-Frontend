import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegClock,
  FaRegFileAlt,
  FaRegCalendarCheck,
  FaRegClipboard,
  FaRegQuestionCircle,
  FaThLarge,
  FaRegBell,
  FaTicketAlt,
  FaClipboardList,
} from "react-icons/fa";
import {
  MdOutlineWork,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import NotificationsModal from "./NotificationsModal";
import { useNotifications } from "../../contexts/NotificationContext";
import { useSelector } from "react-redux";
import socket from "../../socket";

const baseMenuItems = [
  { name: "Dashboard", icon: <FaThLarge />, link: "/dashboard" },
  { name: "Attendance", icon: <FaRegCalendarCheck />, link: "/attendance-dashboard" },
  {
    name: "Leave",
    icon: <IoMdPerson />,
    dropdown: [
      { name: "Apply Leave", link: "/apply-leave" },
      { name: "Leave Status", link: "/leave-status" },
    ],
  },
  { name: "My Payroll", icon: <FaRegFileAlt />, link: "/payroll" },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const { unreadCount } = useNotifications();
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const isHR = data?.employee?.userRole === "hr";

  // Conditionally add HR-specific menu items
  const hrMenuItems = isHR
    ? [
        {
          name: "HR Dashboard",
          icon: <MdOutlineWork />,
          link: "/hr-dashboard",
        },
        {
          name: "Ticket Requests",
          icon: <FaClipboardList />,
          link: "/hr-dashboard",
        },
      ]
    : [];

  const finalMenuItems = [
    ...baseMenuItems,
    ...hrMenuItems,
    {
      name: "Notifications",
      icon: <FaRegBell />,
      action: "open-notifications",
    },
  ];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigation = (link) => {
    navigate(link);
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (data?.employee?._id) {
      socket.emit("register", data.employee._id);
      console.log("Socket registered for employee ID:", data.employee._id);
    }
  }, [data?.employee?._id]);

  return (
    <>
      <div
        className={`fixed left-0 text-white bg-[#1f1f1f] shadow-lg p-4 w-56 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <nav>
          <ul>
            {finalMenuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <div
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#3f3d3d] cursor-pointer"
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
                      {openDropdown === index ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
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
                        <span className="block text-white text-sm">
                          {subItem.name}
                        </span>
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
