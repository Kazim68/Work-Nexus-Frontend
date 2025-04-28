import React, { useState, useEffect } from "react";
import { getAllPendingLeaveRequests, approveLeaveRequest, rejectLeaveRequest } from '../../../Api/Employee/Leaves';
import LeaveDetailsModal from "./LeaveDetailsModal";
import { toast } from "react-toastify";

const HRLeaveRequest = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await getAllPendingLeaveRequests();
        if (response.success) {
          setLeaveRequests(response.pendingLeaves);
        } else {
          console.error("Error fetching leave requests");
        }
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleViewDetails = (leave) => {
    setSelectedLeave(leave);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLeave(null);
  };

  const removeLeaveRequest = (leaveId) => {
    setLeaveRequests((prevRequests) => prevRequests.filter((leave) => leave._id !== leaveId));
  }

  const handleApprove = async (leave) => {
    console.log("Approved Leave:", leave);
    setApproveLoading(true);
    try {
      const response = await approveLeaveRequest(leave._id);
      if (response.success) {
        console.log("Leave approved successfully");
        removeLeaveRequest(leave._id); // Remove the leave request from the list
        toast.success("Leave approved successfully!");
      } else {
        console.error("Error approving leave");
      }
    } catch (error) {
      console.log(error)
      toast.error("Error approving leave request. Please try again.");
    } finally {
      handleCloseModal();
      setApproveLoading(false);
    }
  };

  const handleReject = async (leave) => {
    console.log("Rejected Leave:", leave);
    setRejectLoading(true);
    try {
      const response = await rejectLeaveRequest(leave._id);
      if (response.success) {
        console.log("Leave rejected successfully");
        removeLeaveRequest(leave._id); // Remove the leave request from the list
        toast.success("Leave rejected successfully!");
      } else {
        console.error("Error rejecting leave:", response.statusText);
      }
    } catch (error) {
      console.log(error)
      toast.error("Error rejecting leave request. Please try again.");
    } finally {
      handleCloseModal();
      setRejectLoading(false);
    }
  };

  return (
    <div className="border border-orange-400 rounded overflow-y-auto text-white text-sm w-full max-w-2xl h-60 bg-[#333334]">
      {/* Header */}
      <div className="border-b border-orange-400 p-2 font-semibold text-base">
        New Leave Requests
      </div>

      {/* Leave List */}
      <div className="divide-y divide-gray-400">
        {leaveRequests.length === 0 ? (
          <div className="p-4 text-center text-gray-400">No leave requests</div>
        ) : (
          leaveRequests.map((leave) => (
            <div key={leave.EmployeeID._id} className="grid grid-cols-4 items-center p-3 text-x gap-2">
              <span className="font-semibold">{leave.EmployeeID.name}</span>
              <span>{leave.LeaveType} leave</span>
              <span className="font-semibold">{leave.days} day(s)</span>
              <button
                className="text-blue-400 hover:underline text-center cursor-pointer"
                onClick={() => handleViewDetails(leave)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>


      {/* Modal */}
      <LeaveDetailsModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        leave={selectedLeave}
        onApprove={handleApprove}
        onReject={handleReject}
        approveLoading={approveLoading}
        rejectLoading={rejectLoading}
      />

    </div>
  );
};

export default HRLeaveRequest;
