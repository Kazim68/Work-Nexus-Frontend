import React from "react";

const LeaveForm = () => {
  return (
    <div className="border border-amber-600 p-8 rounded-2xl shadow-md w-full min-h-[630px]">
      <h2 className="text-xl font-semibold mb-6 text-amber-600">Leave Application Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-medium text-white">Employee Id - 101</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Name - Malick Barr</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Leave Type</label>
          <select className="w-full p-3 rounded-lg bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600">
            <option disabled>Select Leave Type</option>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Annual Leave</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Designation</label>
          <select className="w-full p-3 rounded-lg bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600">
          <option disabled>Select Designation</option>
            
            <option>React JS Developer</option>
            <option>Backend Developer</option>
            <option>UI/UX Designer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">From Date</label>
          <input type="date" className="w-full p-3 rounded-lg bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600" />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">To Date</label>
          <input type="date" className="w-full p-3 rounded-lg bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600" />
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium text-white">Reason for Leave</label>
        <textarea className="w-full p-3 rounded-lg bg-[#212020] h-32 border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"></textarea>
      </div>

      <div className="flex justify-center mt-10">
        <button className="bg-amber-600 text-white px-7 py-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-amber-700">
          Submit
        </button>
      </div>
    </div>
  );
};

export default LeaveForm;
