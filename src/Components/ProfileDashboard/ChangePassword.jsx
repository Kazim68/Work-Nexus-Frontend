import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

const ChangePassword = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        repeat: false,
    });

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-[500px] h-auto border border-gray-300">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Change Password</h2>

                <div className="space-y-3">
                    {["current", "new", "repeat"].map((field, index) => (
                        <div key={index} className="relative">
                            <label className="block text-gray-700">
                                {field === "current" && "Current Password:"}
                                {field === "new" && "New Password:"}
                                {field === "repeat" && "Repeat Password:"}
                            </label>
                            <input
                                type={showPasswords[field] ? "text" : "password"}
                                className="w-full p-2 border border-gray-300 rounded-md pr-10"
                                value={
                                    field === "current"
                                        ? currentPassword
                                        : field === "new"
                                        ? newPassword
                                        : repeatPassword
                                }
                                onChange={(e) =>
                                    field === "current"
                                        ? setCurrentPassword(e.target.value)
                                        : field === "new"
                                        ? setNewPassword(e.target.value)
                                        : setRepeatPassword(e.target.value)
                                }
                            />
                            <span
                                className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                onClick={() => togglePasswordVisibility(field)}
                            >
                                {showPasswords[field] ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between mt-6">
                    <button className="px-4 py-2 bg-blue-400 text-white rounded-md">Save</button>
                    <button className="px-4 py-2 border border-gray-400 rounded-md" onClick={onClose}>
                        Back
                    </button>
                </div>

                <p className="text-sm text-gray-600 mt-4">
                    Password must: <br />
                    - include lower and upper characters <br />
                    - include at least 1 number or symbol <br />
                    - be at least 8 characters long <br />
                    - match in both fields <br />
                    - cannot contain spaces and '|' symbol
                </p>
            </div>
        </div>
    );
};

export default ChangePassword;
