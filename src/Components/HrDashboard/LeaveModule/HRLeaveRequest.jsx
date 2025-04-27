import React from "react";

const HRLeaveRequest = () => {
  const leaveRequests = [
    { empId: "EMP-101", leaveType: "Sick Leave", duration: "2 Days" },
    { empId: "EMP-102", leaveType: "Paternity Leave", duration: "7 Days" },
  ];

  return (
    <div className="border border-orange-400 rounded text-white text-sm w-full max-w-2xl h-60 bg-[#333334]">
      {/* Header */}
      <div className="border-b border-orange-400 p-4 font-semibold text-base">
        New Leave Requests
      </div>

      {/* Leave List */}
      <div className="divide-y divide-gray-400">
        {leaveRequests.map((leave, index) => (
          <div key={index} className="flex justify-between items-center p-5">
            <div className="flex flex-col">
              <span className="font-bold text-lg">{leave.empId}</span>
              <span className="text-sm">{leave.leaveType}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-bold text-lg">{leave.duration}</span>
              <a href="#" className="text-blue-400 text-sm hover:underline mt-1">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRLeaveRequest;
