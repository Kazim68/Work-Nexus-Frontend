import React, { useEffect, useRef, useState } from "react";
import { useNotifications } from "../../contexts/NotificationContext.jsx";

const NotificationsModal = ({ onClose }) => {
    const modalRef = useRef();
    const [selectedNotification, setSelectedNotification] = useState(null);
    const { notifications, } = useNotifications();

    // Close modal if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
            <div ref={modalRef} className="bg-[#2c2b2b] rounded-lg p-6 w-96 max-h-[80vh] text-white relative overflow-hidden">
                <h2 className="text-lg font-semibold mb-4">Notifications</h2>

                <div className="space-y-3 overflow-y-auto max-h-[calc(80vh-100px)] pr-2">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-3 rounded-lg cursor-pointer ${notification.read ? "bg-[#4a4848] text-gray-400" : "bg-[#3f3d3d] text-white"
                                } hover:bg-[#5a5858]`}
                            onClick={() => setSelectedNotification(notification)}
                        >
                            {/* Only showing a small preview */}
                            <div className="truncate">{notification.text}</div>
                        </div>
                    ))}
                </div>

                {/* Close Button */}
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Notification Detail Sub-Modal */}
                {selectedNotification && (
                    <div className="absolute inset-0 bg-[#2c2b2b] p-6 rounded-lg flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Notification Detail</h3>
                            <p className="text-sm text-white">{selectedNotification.text}</p>
                        </div>
                        <button
                            className="mt-6 px-4 py-2 bg-amber-600 rounded hover:bg-amber-700 text-white text-sm self-end"
                            onClick={() => setSelectedNotification(null)}
                        >
                            Back
                        </button>
                    </div>
                )}


            </div>
        </div>
    );
};

export default NotificationsModal;
