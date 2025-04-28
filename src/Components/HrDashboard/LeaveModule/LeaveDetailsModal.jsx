import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import ButtonLoader from '../../Shared/ButtonLoader';

const LeaveDetailsModal = ({ isOpen, onClose, leave, onApprove, onReject, approveLoading, rejectLoading }) => {
    const modalRef = useRef();

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

    if (!isOpen || !leave) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-[#333334] border border-orange-400 rounded-lg p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()} ref={modalRef}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-orange-400 text-2xl"
                >
                    <IoMdClose />
                </button>

                {/* Employee Info */}
                <div className="space-y-2 mb-6">
                    <div><span className="font-semibold">Name - </span><span className="text-orange-400">{leave.EmployeeID.name}</span></div>
                    <div><span className="font-semibold">Designation - </span>{leave.EmployeeID.designation || "N/A"}</div>
                    <div><span className="font-semibold">Employee ID - </span><span className="text-orange-400">{leave.EmployeeID.employeeCode || "N/A"}</span></div>
                    <div><span className="font-semibold">Department - </span>{leave.EmployeeID.department || "N/A"}</div>
                </div>

                {/* Leave Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <div className="text-xs">Leave Type</div>
                        <div className="bg-orange-400 p-2 rounded font-semibold">{leave.LeaveType}</div>
                    </div>
                    <div>
                        <div className="text-xs">Leave Duration</div>
                        <div className="bg-orange-400 p-2 rounded font-semibold">{leave.days} day(s)</div>
                    </div>
                    <div>
                        <div className="text-xs">From Date</div>
                        <div className="bg-orange-400 p-2 rounded font-semibold">{new Date(leave.LeaveStartDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                        <div className="text-xs">To Date</div>
                        <div className="bg-orange-400 p-2 rounded font-semibold">{new Date(leave.LeaveEndDate).toLocaleDateString()}</div>
                    </div>
                </div>

                {/* Reason */}
                <div className="mb-6">
                    <div className="text-xs mb-1">Reason for Leave</div>
                    <div className="bg-orange-400 min-h-[100px] p-2 rounded">{leave.LeaveReason || "No reason provided."}</div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-15">
                    <button
                        onClick={() => onApprove(leave)}
                        disabled={approveLoading || rejectLoading} 
                        className="bg-amber-500 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold"
                    >
                        {approveLoading ? <ButtonLoader /> : "Approve"}
                    </button>
                    <button
                        onClick={() => onReject(leave)}
                        disabled={approveLoading || rejectLoading}
                        className="bg-amber-500 hover:bg-red-600 px-6 py-2 rounded text-white font-semibold"
                    >
                        {rejectLoading ? <ButtonLoader /> : "Reject"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeaveDetailsModal;
