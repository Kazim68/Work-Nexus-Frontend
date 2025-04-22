import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";



const ContactInfoModal = ({ isOpen, onClose }) => {
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const { data } = useSelector((state) => state.user);
    const employee = data?.employee;
    const contactInfo = {
        username: employee?.name || "N/A",
        password: "************",
        email: employee?.email || "N/A",
        phoneNumber:employee?.phoneNumber || "N/A",
    };
    if (!isOpen) return null;

    return (
        <>
            {/* Contact Info Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="p-6 rounded-md shadow-lg w-[600px] h-[400px] border border-amber-600">
                    <h2 className="text-3xl font-bold mb-4 text-white text-center">Contact Info</h2>
                    <div className="space-y-6"> {/* Increased margin between rows */}
                        {Object.entries(contactInfo).map(([label, value], index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center mt-5" // Added margin-top for each row
                            >
                                <strong className="ml-20 text-white text-lg">
                                    {label.charAt(0).toUpperCase() + label.slice(1)}:
                                </strong>

                                {label === "password" ? (
                                    <span className="flex items-center text-white mr-8 text-lg">
                                        {value}
                                        <FaEdit
                                            className="ml-2 cursor-pointer text-white hover:text-gray-800"
                                            onClick={() => setIsChangePasswordOpen(true)}
                                        />
                                    </span>
                                ) : (
                                    <span className="text-white mr-8 text-lg">{value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center"> {/* Increased margin above the button */}
                        <button
                            className="px-4 py-2 bg-amber-600 text-white rounded-md text-lg"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* Change Password Modal (Separate Popup) */}
            {isChangePasswordOpen && (
                <ChangePassword onClose={() => setIsChangePasswordOpen(false)} />
            )}
        </>
    );
};

export default ContactInfoModal;
