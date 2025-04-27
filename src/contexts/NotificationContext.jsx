import React, { createContext, useContext, useState, useEffect } from "react";
import socket from "../socket";
import { GetNotifications } from "../Api/Employee/Notifications";


const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await GetNotifications();  // Your API function to get notifications
      if (res.success) {
        const formatted = res.notifications.map(n => ({
          id: n._id,
          text: n.message,
          read: n.isRead,
        }));
        setNotifications(formatted);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // Handle new real-time notification
  const handleNewNotification = (notification) => {
    console.log("New notification received:", notification);
    setNotifications(prev => [
      {
        id: notification.id,
        text: notification.message,
        read: false,
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    fetchNotifications();

    // Listen for real-time notification
    socket.on("new_notification", handleNewNotification);

    return () => {
      socket.off("new_notification", handleNewNotification);
    };
  }, []);


  return (
    <NotificationContext.Provider value={{ notifications, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
