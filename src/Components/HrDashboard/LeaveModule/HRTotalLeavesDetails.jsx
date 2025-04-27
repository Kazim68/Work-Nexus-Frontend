import React from "react";

const HRTotalLeavesDetails = () => {
  return (
    <div className="flex items-center justify-between border border-orange-400 p-6 rounded-xl w-full max-w-5xl h-60 bg-[#2f2f30]">
      {/* Left Section */}
      <div className="flex flex-col items-center justify-center w-1/3">
        <p className="text-orange-400 font-semibold text-lg text-center">Leave Requests</p>
      </div>

      {/* Middle Section */}
      <div className="bg-orange-400 w-1/6 h-32 flex items-center justify-center rounded-md">
        <p className="text-black text-2xl font-bold">10</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col w-1/3 h-32">
        <div className="flex-1 flex items-center justify-between border-b border-gray-400">
          <p className="text-white text-base">Today</p>
          <div className="bg-white flex items-center justify-center h-12 w-12 rounded-sm ml-2">
            <p className="text-black font-bold text-lg">0</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-between mt-2">
          <p className="text-sky-400 text-base">This Month</p>
          <div className="bg-sky-400 flex items-center justify-center h-12 w-12 rounded-sm ml-2">
            <p className="text-white font-bold text-lg">2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRTotalLeavesDetails;
