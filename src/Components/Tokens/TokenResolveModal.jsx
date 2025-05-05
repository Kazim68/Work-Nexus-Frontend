import React, { useEffect, useState } from 'react';
import { update } from '../../Api/Api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const TokenResolveModal = ({ showModal, closeModal, selectedRow }) => {
  const { data } = useSelector((state) => state.user);
  const workingHoursString = data.employee.companyID.workTimings?.[0];

  const [clockOutTime, setClockOutTime] = useState("");
 

  const getEndTime = (timeRange) => {
    if (!timeRange) return 0;
    const [_, end] = timeRange.split(" - ");
    return end;
  };

  const [loading, setLoading] = useState(false);

  const getFormatedDate = (param) => {
    const date = new Date(param);
    return date.toLocaleDateString();
  };

  const endTime = getEndTime(workingHoursString);

  const handleAccept = async (tokenId) => {
    setLoading(true);
    try {
      await update(`/token/resolve/missingClockOut`, tokenId, { workEndTime: clockOutTime }, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        }
      });
      toast.success('Token Resolved');
    } catch (error) {
      toast.error(error.message || "Failed.");
    }
    setLoading(false);
    closeModal();
  };

  const handleAssign = async (tokenId) => {
    setLoading(true);
    try {
      await update(`/token/resolve`, tokenId, {}, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        }
      });
      toast.success('Token marked as resolved');
    } catch (error) {
      toast.error(error.message || "Failed.");
    }
    setLoading(false);
    closeModal();
  };

  const handleReject = async (tokenId) => {
    setLoading(true);
    try {
      await update(`/token/reject`, tokenId, {}, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        }
      });
      toast.success('Token Rejected');
    } catch (error) {
      toast.error(error.message || "Failed.");
    }
    setLoading(false);
    closeModal();
  };

  return (
    <>
      {showModal && selectedRow && (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-lg flex items-center justify-center">
          <div className="relative rounded p-6 w-96 shadow-lg border text-white border-amber-600 bg-[#1e1e1e]">

            <button
              className="absolute top-2 right-2 cursor-pointer text-white text-xl hover:text-red-500"
              onClick={closeModal}
            >
              &times;
            </button>

            <h3 className="text-lg font-semibold mb-4 text-amber-600">
              Token Details
            </h3>

            <p className="mb-2">
              <strong>Employee:</strong>{" "}
              {selectedRow.EmployeeID?.firstName}{" "}
              {selectedRow.EmployeeID?.lastName}
            </p>

            <p className="mb-2">
              <strong>Issue:</strong> {selectedRow.IssueType}
            </p>

            <p className="mb-2">
              <strong>Issue Date:</strong> {getFormatedDate(selectedRow.IssueDate)}
            </p>

            <p className="mb-2">
              <strong>Token Raised On:</strong> {getFormatedDate(selectedRow.RaisedDate)}
            </p>

            <p className="mb-2">
              <strong>Description:</strong> {selectedRow.Description}
            </p>

            {(selectedRow.IssueType === "Attendance" && selectedRow.Issue === "Clock-out missing") ? (
              <>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Clock Out Time</label>
                  <input
                    type="time"
                    value={clockOutTime}
                    onChange={(e) => setClockOutTime(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleAccept(selectedRow._id)}
                    disabled={loading}
                  >
                    Mark clock out
                  </button>
                  <button
                    className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleReject(selectedRow._id)}
                    disabled={loading}
                  >
                    Reject
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleAssign(selectedRow._id)}
                    disabled={loading}
                  >
                    Assign
                  </button>
                  <button
                    className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleReject(selectedRow._id)}
                    disabled={loading}
                  >
                    Reject
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TokenResolveModal;
