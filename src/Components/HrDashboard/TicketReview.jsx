import React from "react";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const TicketReview = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#2e2e2e] text-white border border-orange-500 rounded-lg p-6 w-[600px]">
                {/* Header */}
                <div className="flex justify-between mb-4">
                    <div>
                        <p>
                            <span className="text-gray-300">Name - </span>
                            <span className="text-orange-400 font-semibold">Malick Barr</span>
                        </p>
                        <p>
                            <span className="text-gray-300">Employee ID - </span>
                            <span className="text-orange-400 font-semibold">EMP-101</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p>
                            <span className="text-gray-300">Designation - </span>
                            <span className="text-orange-400 font-semibold">Jr. Data Scientist</span>
                        </p>
                        <p>
                            <span className="text-gray-300">Department - </span>
                            <span className="text-orange-400 font-semibold">Data Science</span>
                        </p>
                    </div>
                </div>

                {/* Ticket Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1 text-sm">Ticket Type</label>
                        <div className="bg-orange-500 font-bold py-2 px-3 rounded text-center">Technical Problem</div>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Title</label>
                        <div className="bg-orange-500 font-bold py-2 px-3 rounded text-center">Ethernet Not Working</div>
                    </div>
                </div>

                {/* Date */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm">Date Of Issue</label>
                    <div className="bg-orange-500 font-bold py-2 px-3 rounded inline-flex items-center gap-2">
                        24/11/2023 <FaCalendarAlt />
                    </div>
                </div>

                {/* Details */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm">Details</label>
                    <div className="bg-orange-500 text-black py-3 px-4 rounded relative">
                        <FaEdit className="absolute top-2 right-2 text-gray-700" />
                        {/* Replace below text with actual details if needed */}
                        Description of the Ethernet issue here...
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between items-center mt-6">
                    <div className="text-sm">
                        <p className="mb-1">Assign to:</p>
                        <div className="bg-orange-500 py-1.5 px-3 rounded inline-flex items-center gap-2 text-black font-semibold">
                            IT Department <IoIosArrowForward />
                        </div>
                    </div>
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
                        onClick={onClose}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TicketReview;
