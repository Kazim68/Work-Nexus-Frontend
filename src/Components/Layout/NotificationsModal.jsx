import React, { useEffect, useRef, useState } from "react";
import { useNotifications } from "../../contexts/NotificationContext.jsx";

const NotificationsModal = ({ onClose }) => {
    const modalRef = useRef();
    const [selectedNotification, setSelectedNotification] = useState(null);
    const { notifications, markAsRead, deleteNotification } = useNotifications();

    // Close modal if clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        console.log(notifications)

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
            <div ref={modalRef} className="bg-[#2c2b2b] rounded-xl p-6 w-96 max-h-[80vh] text-white relative overflow-hidden shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center text-amber-600">Notifications</h2>

                <div className="space-y-3 overflow-y-auto max-h-[360px] pr-2 custom-scrollbar">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200 ${notification.read ? "bg-[#4a4848] text-gray-200" : "bg-[#3f3d3d] text-amber-600"
                                } hover:bg-[#5a5858]`}
                        >
                            <div
                                className="flex-1"
                                onClick={() => {
                                    setSelectedNotification(notification);
                                    if (!notification.read) {
                                        markAsRead(notification.id);
                                    }
                                }}
                            >
                                <div className="font-semibold truncate">{notification.title}</div>
                                <div className="text-xs text-gray-200 mt-1">
                                    {new Date(notification.date).toDateString() === new Date().toDateString()
                                        ? new Date(notification.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        : new Date(notification.date).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Delete Button */}
                            <button className="text-gray-100 hover:text-amber-600 ml-3 cursor-pointer"
                                onClick={() => deleteNotification(notification.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>

                            </button>
                        </div>
                    ))}
                </div>

                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    ✕
                </button>

                {/* Notification Detail Sub-Modal */}
                {selectedNotification && (
                    <div className="absolute inset-0 bg-[#2c2b2b] p-6 rounded-lg flex flex-col justify-between">
                        <div className="overflow-y-auto custom-scrollbar max-h-[calc(80vh-100px)]">
                            <h3 className="text-xl font-bold mb-2">{selectedNotification.title}</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">{selectedNotification.text}</p>
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
