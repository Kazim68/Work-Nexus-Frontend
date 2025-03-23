import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const OrganizationInfo = () => {

  const navigate = useNavigate()
  const handleOrgInfo = ()=>{

    navigate('/pricing-plan')

  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        {/* Organization Logo Upload */}
        <div className="relative w-20 h-20 mx-auto mb-10">
          <img
            src={"https://img.icons8.com/ios/100/000000/company.png"}
            alt="Organization Logo"
            className="w-full h-full object-cover rounded-lg bg-gray-200"
          />
        </div>

        {/* Organization Name */}
        <div className="text-left mb-8">
          <label className="block text-gray-700 font-medium">Organization Name</label>
          <input
            type="text"
            placeholder="Enter your Organization Name"
            className="w-full mt-2 p-3  rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Organization Type Dropdown */}
        <div className="text-left mb-8">
          <label className="block text-gray-700 font-medium">Organization Type</label>
          <select className="w-full mt-2 p-3  rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Select Organization Type</option>
            <option>Startup</option>
            <option>Enterprise</option>
            <option>Non-Profit</option>
          </select>
        </div>

        {/* Employee Count Dropdown */}
        <div className="text-left mb-10">
          <label className="block text-gray-700 font-medium">Employee Count</label>
          <select className="w-full mt-2 p-3  rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>Select Employee Count</option>
            <option>1-10</option>
            <option>11-50</option>
            <option>51-200</option>
            <option>201-1000</option>
            <option>1000+</option>
          </select>
        </div>

        {/* Continue Button */}
        <button onClick={handleOrgInfo} className="cursor-pointer w-full bg-teal-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-teal-700">
          Continue
        </button>
      </div>
    </div>
  );
};

export default OrganizationInfo;
