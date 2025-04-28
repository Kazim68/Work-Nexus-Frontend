import React, { createContext, useContext, useState, useEffect } from "react";
import socket from "../socket";
import { GetNotifications, MarkAsRead, DeleteNotification } from "../Api/Employee/Notifications";


const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const res = await GetNotifications();  // Your API function to get notifications
      if (res.success) {
        const formatted = res.notifications.map(n => ({
          id: n._id,
          text: n.message,
          title: n.title,
          date: new Date(n.createdAt),
          read: n.isRead,
        }));
        console.log("Fetched notifications:", formatted);
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
        title: notification.title,
        date: new Date(notification.createdAt),
        read: false,
      },
      ...prev,
    ]);
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const res = await MarkAsRead(notificationId);
      if (res.success) {
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === notificationId ? { ...notification, read: true } : notification
          )
        );
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  // Delete notification
const deleteNotification = async (notificationId) => {
  try {
    const res = await DeleteNotification(notificationId);
    if (res.success) {
      setNotifications(prev =>
        prev.filter(notification => notification.id !== notificationId)
      );
    }
  } catch (err) {
    console.error("Failed to delete notification:", err);
  }
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
    <NotificationContext.Provider value={{ notifications, fetchNotifications , unreadCount, markAsRead, deleteNotification}}>
      {children}
    </NotificationContext.Provider>
  );
};
