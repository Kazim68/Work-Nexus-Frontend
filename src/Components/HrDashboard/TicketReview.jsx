import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const TicketReview = ({ onClose, ticket }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-md transition-opacity duration-300 ease-in-out">
            <div className="bg-[#212020] text-amber-600 border border-amber-600 rounded-xl shadow-xl w-full max-w-xl p-6 relative">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white hover:text-red-500 text-2xl"
                    aria-label="Close"
                >
                    <IoIosCloseCircleOutline />
                </button>

                {/* Header */}
                <div className="mb-4 border-b pb-4">
                    <h2 className="text-lg font-semibold">
                        {ticket.EmployeeID.firstName} {ticket.EmployeeID.lastName}
                    </h2>
                    <p className="text-sm text-white">
                        Employee Code: <span className="font-medium text-gray-700">{ticket.EmployeeID.employeeCode}</span>
                    </p>
                </div>

                {/* Ticket Info */}
                <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                        <p className="text-xs text-white mb-1">Ticket Type</p>
                        <p className="text-sm font-medium">{ticket.IssueType}</p>
                    </div>
                    <div>
                        <p className="text-xs text-white mb-1">Title</p>
                        <p className="text-sm font-medium">{ticket.Issue}</p>
                    </div>
                </div>

                {/* Date */}
                <div className="mb-4">
                    <p className="text-xs text-white mb-1">Date of Issue</p>
                    <p className="text-sm font-medium flex items-center gap-2">
                        {formatDate(ticket.RaisedDate)} <FaCalendarAlt className="text-gray-400" />
                    </p>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <p className="text-xs text-white mb-1">Details</p>
                    <p className="text-sm leading-relaxed text-gray-700 border rounded-md p-3 bg-gray-50">
                        {ticket.Description}
                    </p>
                </div>

                {/* Footer */}
                <div className="text-right">
                    <Link
                        to="/hr/tickets"
                        onClick={onClose}
                        className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-5 py-2 rounded-md transition-colors"
                    >
                        Proceed
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TicketReview;
