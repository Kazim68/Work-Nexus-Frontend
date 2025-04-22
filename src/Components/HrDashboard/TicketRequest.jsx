import React, { useState } from "react";
import TicketReview from "./TicketReview"; // Importing modal

const tickets = [
    { id: "EMP-101", issue: "Ethernet not working", link: "#" },
    { id: "EMP-102", issue: "Laptop Battery Died", link: "#" },
    { id: "EMP-103", issue: "Monitor Flickering", link: "#" },
    { id: "EMP-104", issue: "Keyboard Not Working", link: "#" },
];

const TicketRequests = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="border border-[#F99932] rounded-md p-4 bg-[#333334] text-white w-full max-w-sm h-[300px] flex flex-col justify-evenly">
            {/* Header */}
            <div className="mb-1">
                <h2 className="font-semibold text-base">Ticket Requests</h2>
                <div className="w-full h-[2px] bg-[#F99932] mt-1" />
            </div>

            {/* Tickets List */}
            <div className="space-y-3 text-[14px]">
                {tickets.map((ticket) => (
                    <div key={ticket.id} className="border-b border-gray-400 pb-2 flex justify-between items-center">
                        <div className="flex gap-2 font-semibold">
                            <span>{ticket.id}</span>
                            <span className="font-normal">{ticket.issue}</span>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-sky-400 hover:underline whitespace-nowrap"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && <TicketReview onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default TicketRequests;
