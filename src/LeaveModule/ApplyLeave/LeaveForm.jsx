import React from "react";

const LeaveForm = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-full">
      <h2 className="text-xl font-semibold mb-6">Leave Application Form</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee Id - 101</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name - Malick Barr</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Leave Type</label>
          <select className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Sick Leave</option>
            <option>Casual Leave</option>
            <option>Annual Leave</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Designation</label>
          <select className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>React JS Developer</option>
            <option>Backend Developer</option>
            <option>UI/UX Designer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">From Date</label>
          <input type="date" className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">To Date</label>
          <input type="date" className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500" />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Reason for Leave</label>
        <textarea className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 h-24"></textarea>
      </div>

      {/* Centered & Smaller Submit Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-teal-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-teal-700">
          Submit
        </button>
      </div>
    </div>
  );
};

export default LeaveForm;
