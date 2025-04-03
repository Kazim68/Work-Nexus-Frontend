import React from "react";

const LeaveRequest = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md h-31 w-full">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center w-1/4">
        <p className="text-green-500 text-base font-semibold text-center">
          Leave Requests
        </p>
      </div>

      {/* Middle Section */}
      <div className="bg-green-300 w-1/6 h-full flex items-center justify-center rounded-lg">
        <p className="text-black text-xl font-bold">10</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-1/2 h-full">
        <div className="flex-1 flex items-center justify-between bg-white rounded-t-xl border-b border-gray-200">
          <p className="text-teal-600 text-base font-semibold pl-4">Today</p>
          {/* Margin from left */}
          <div className="bg-teal-400 flex items-center justify-center rounded-lg ml-3 h-12 w-12 mr-4">
            <p className="text-black text-lg font-bold">0</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-between bg-white rounded-b-xl">
          <p className="text-blue-600 text-base font-semibold pl-4">This Month</p>
          <div className="bg-blue-400 flex items-center justify-center rounded-lg h-12 ml-3 w-12 mr-4">
            <p className="text-black text-lg font-bold">2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
