import React, { useState } from "react";
import Profile from "./MyProfile";
import EmployeeDetails from "./EmployeeDetails";
import AddressInfo from "./AddressInfo";
import BankInfo from "./BankInfo";
import Layout from "../Layout/Layout";

const ProfileDashboard = () => {
  const [showProfileOnly, setShowProfileOnly] = useState(true);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-8">

        {/* Profile Section */}
        <div className="flex justify-start mb-6 ml-15">
          <Profile />
        </div>
        {/* Navigation Buttons */}
        <div className="flex justify-start mb-4">
          <button
            className={`px-4 py-2 mr-2 ${
              showProfileOnly ? "text-gray-700 border-b-2 border-gray-700" : "text-gray-500"
            }`}
            onClick={() => setShowProfileOnly(true)}
          >
            Profile
          </button>
          <button
            className={`px-4 py-2 ${
              !showProfileOnly ? "text-gray-700 border-b-2 border-gray-700" : "text-gray-500"
            }`}
            onClick={() => setShowProfileOnly(false)}
          >
            Contact Info
          </button>
        </div>

        {/* Dotted space Line */}
        <hr className="border-dotted border-gray-400 my-4 mx-4" />

        {/* Conditional Rendering */}
        {!showProfileOnly && (
          <>
            {/* Employee Details */}
            <EmployeeDetails />

            {/* Address and Bank Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Address Info Section */}
              <div>
                <h2 className="text-lg mb-4 text-gray-700">My Address</h2>
                <AddressInfo />
              </div>

              {/* Bank Info Section */}
              <div>
                <h2 className="text-lg mb-4 text-gray-700">Bank Information</h2>
                <BankInfo />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProfileDashboard;
