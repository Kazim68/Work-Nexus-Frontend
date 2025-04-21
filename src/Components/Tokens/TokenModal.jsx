import React, { useState } from "react";
import {
    FaTools,
    FaLaptopCode,
    FaNetworkWired,
    FaCalendarCheck,
    FaUserShield,
    FaEllipsisH
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createWithAuth } from "../../Api/Api";

const tokenOptions = [
    { icon: <FaUserShield size={30} />, label: "Personal" },
    { icon: <FaCalendarCheck size={30} />, label: "Attendance" },
    { icon: <FaLaptopCode size={30} />, label: "Software" },
    { icon: <FaTools size={30} />, label: "Hardware" },
    { icon: <FaNetworkWired size={30} />, label: "Network" },
    { icon: <FaEllipsisH size={30} />, label: 'Other' }
];

const commonAttendanceIssues = [
    "Clock-out missing",
    "Late arrival",
    "Early departure",
    "Incorrect hours recorded"
];

const TokenModal = ({ isOpen, onClose }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [issueDate, setIssueDate] = useState("");
    const [loading,setLoading] = useState(false)

    const [errors, setErrors] = useState({
        type: "",
        heading: "",
        description: "",
        issueDate: ""
    });

    const [showAttendanceDropdown, setShowAttendanceDropdown] = useState(false);

    const { data } = useSelector((state) => state.user);
    const employeeId = data.employee._id;
    const token = data.token;

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({ type: "", heading: "", description: "", issueDate: "" });

        let formValid = true;
        const newErrors = {};

        if (!selectedType) {
            newErrors.type = "Please select an issue type.";
            formValid = false;
        }
        if (!heading) {
            newErrors.heading = "Please enter a heading.";
            formValid = false;
        }
        if (!description) {
            newErrors.description = "Please enter a description.";
            formValid = false;
        }
        if (!issueDate) {
            newErrors.issueDate = "Please enter issue date.";
            formValid = false;
        }

        if (!formValid) {
            setErrors(newErrors);
            return;
        }

        const payload = {
            IssueType: selectedType,
            Issue: heading,
            Description: description,
            IssueDate: issueDate
        };

        try {
            setLoading(true);
            const res = await createWithAuth(`/token/create/${employeeId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Token placed successfully!");
        } catch (error) {
            toast.error(error.message || "Failed.");
        } finally {
            setLoading(false);
        }

        console.log("Submitting token:", payload);
        onClose(); // Close after submit
    };

    const handleTypeSelection = (type) => {
        setSelectedType(type);
        if (type === "Attendance") {
            setShowAttendanceDropdown(true);
        } else {
            setShowAttendanceDropdown(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50  bg-opacity-50 backdrop-blur-lg flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="border border-amber-600 rounded-lg p-6 w-full max-w-xl shadow-xl bg-[#1a1a1a]"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Raise a Token</h2>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-400 hover:text-white text-2xl font-bold cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                {/* Issue Type */}
                <div className="mb-4">
                    <p className="text-sm font-semibold text-white mb-2">Issue Type</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {tokenOptions.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleTypeSelection(item.label)}
                                className={`cursor-pointer p-4 rounded-lg flex flex-col items-center justify-center border
                  ${selectedType === item.label
                                    ? "bg-amber-600 text-white"
                                    : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                    }`}
                            >
                                <div className="mb-1">{item.icon}</div>
                                <p className="text-sm font-medium">{item.label}</p>
                            </div>
                        ))}
                    </div>
                    {errors.type && (
                        <p className="text-sm text-red-500 mt-2">{errors.type}</p>
                    )}
                </div>

                {/* Common Attendance Issues Dropdown */}
                {showAttendanceDropdown && (
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-white mb-2">Attendance Issue</p>
                        <select
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                        >
                            <option value="">Select an issue...</option>
                            {commonAttendanceIssues.map((issue, index) => (
                                <option key={index} value={issue}>{issue}</option>
                            ))}
                        </select>
                        {errors.heading && (
                            <p className="text-sm text-red-500 mt-2">{errors.heading}</p>
                        )}
                    </div>
                )}

                {/* Issue Heading */}
                {!showAttendanceDropdown && (
                    <div className="mb-4">
                        <p className="text-sm font-semibold text-white mb-2">Issue Heading</p>
                        <input
                            type="text"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            placeholder="Enter heading..."
                            className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                        />
                        {errors.heading && (
                            <p className="text-sm text-red-500 mt-2">{errors.heading}</p>
                        )}
                    </div>
                )}

                {/* Issue Date */}
                <div className="mb-4">
                    <p className="text-sm font-semibold text-white mb-2">Issue Date</p>
                    <input
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                        placeholder="Enter issue date..."
                        className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                    />
                    {errors.issueDate && (
                        <p className="text-sm text-red-500 mt-2">{errors.issueDate}</p>
                    )}
                </div>

                {/* Description */}
                <div className="mb-6">
                    <p className="text-sm font-semibold text-white mb-2">Description</p>
                    <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the issue..."
                        className="w-full px-5 py-3 rounded-lg font-medium bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500 mt-2">{errors.description}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="cursor-pointer w-full px-5 py-3 rounded-lg font-semibold bg-amber-600 text-white hover:bg-amber-700 transition"
                >
                    Submit Token
                </button>
            </form>
        </div>
    );
};

export default TokenModal;
