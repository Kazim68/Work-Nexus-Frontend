import React, { useState } from "react";
import TicketReview from "./TicketReview"; // Importing modal


const TicketRequests = ({tickets}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState();


    return (
        <div className="border border-[#F99932] rounded-md p-4  text-white w-full max-w-sm h-[300px] overflow-y-auto flex flex-col justify-evenly">
            {/* Header */}
            <div className="mb-1">
                <h2 className="font-semibold text-base">Ticket Requests</h2>
                <div className="w-full h-[2px] bg-[#F99932] mt-1" />
            </div>

            {/* Tickets List */}
            <div className="space-y-3 text-[14px]">
                {tickets.map((ticket) => (
                    <div key={ticket._id} className="border-b border-gray-400 pb-2 flex justify-between items-center">
                        <div className="flex gap-2 font-semibold">
                            <span>{ticket.EmployeeID.employeeCode}</span>
                            <span>{ticket.EmployeeID.firstName} {ticket.EmployeeID.lastName}</span>

                            <span className="font-normal">{ticket.IssueType}</span>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedTicket(ticket); // Set the selected ticket
                                setShowModal(true); // Open the modal
                            }}
                            className="text-sky-400 hover:underline whitespace-nowrap"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && <TicketReview onClose={() => setShowModal(false)} ticket={selectedTicket} />}
        </div>
    );
};

export default TicketRequests;
