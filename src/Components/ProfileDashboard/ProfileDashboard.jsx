import React, { useState } from "react";
import Profile from "./MyProfile";
import EmployeeDetails from "./EmployeeDetails";
import BankInfo from "./BankInfo";
import Layout from "../Layout/Layout";

const ProfileDashboard = () => {
  return (
    <Layout>
      <div className="min-h-screen rounded-md border border-amber-600 p-8">
        
        {/* Employee Details at the Top */}
        <div className="flex flex-col md:flex-row md:space-x-8 mb-6">
          <div className="md:w-full flex items-center justify-center">
            <EmployeeDetails />
          </div>
        </div>

        {/* Dotted Line Separator */}
        <hr className="border-dotted border-amber-600 mb-6" />

        {/* Profile and Bank Info Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="md:w-full flex items-center justify-center">
            <Profile />
          </div>
          <div>
            <h2 className="text-lg mb-4 text-white">Bank Information</h2>
            <BankInfo />
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default ProfileDashboard;