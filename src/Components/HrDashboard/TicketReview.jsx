import React from "react";
import { FaCalendarAlt, FaEdit } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const TicketReview = ({ onClose , ticket }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
      };

      
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#2e2e2e] text-white border border-orange-500 rounded-lg p-6 w-[600px]">
                {/* Header */}
                <div className="flex justify-between mb-4">
                    <div>
                        <p>
                            <span className="text-gray-300">Name - </span>
                            <span className="text-orange-400 font-semibold">{ticket.EmployeeID.firstName} {ticket.EmployeeID.lastName}</span>
                        </p>
                        <p>
                            <span className="text-gray-300">Employee Code - </span>
                            <span className="text-orange-400 font-semibold">{ticket.EmployeeID.employeeCode}</span>
                        </p>
                    </div>
                </div>

                {/* Ticket Info */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-1 text-sm">Ticket Type</label>
                        <div className="bg-orange-500 font-bold py-2 px-3 rounded text-center">{ticket.IssueType}</div>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Title</label>
                        <div className="bg-orange-500 font-bold py-2 px-3 rounded text-center">{ticket.Issue}</div>
                    </div>
                </div>

                {/* Date */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm">Date Of Issue</label>
                    <div className="bg-orange-500 font-bold py-2 px-3 rounded inline-flex items-center gap-2">
                        {formatDate(ticket.RaisedDate)} <FaCalendarAlt />
                    </div>
                </div>

                {/* Details */}
                <div className="mb-4">
                    <label className="block mb-1 text-sm">Details</label>
                    <div className="bg-orange-500 text-black py-3 px-4 rounded relative">
                        {/* Replace below text with actual details if needed */}
                        {ticket.Description}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-right items-center mt-6">
                    <Link
                    to='/hr/tickets'
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
                        onClick={onClose}
                    >
                        Proceed
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TicketReview;
