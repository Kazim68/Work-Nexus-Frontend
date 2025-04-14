import React, { useState } from "react";
import Profile from "./MyProfile";
import EmployeeDetails from "./EmployeeDetails";
import AddressInfo from "./AddressInfo";
import BankInfo from "./BankInfo";
import Layout from "../Layout/Layout";
import ContactInfoModal from "./ContactInfoModal";

const ProfileDashboard = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <Layout>
      <div className={`min-h-screen rounded-md border border-amber-600 p-8 ${showContactModal ? "blur-sm" : ""}`}>
        {/* Profile Section (Profile Picture & Buttons) */}
        <div className=" mb-6">
          <Profile />
          {/* Navigation Buttons under Profile */}
          <div className="mt-4 flex space-x-4">
            <button className="px-4 py-2 text-white border-b-2 border-amber-600">
              Profile
            </button>
            <button
              className="px-4 py-2 text-white"
              onClick={() => setShowContactModal(true)}
            >
              Contact Info
            </button>
          </div>
          {/* Dotted Line Separator */}
          <hr className="border-dotted border-amber-600 mt-4" />
        </div>

        {/* Profile Details */}
        <EmployeeDetails />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-lg mb-4 text-white">My Address</h2>
            <AddressInfo />
          </div>
          <div>
            <h2 className="text-lg mb-4 text-white">Bank Information</h2>
            <BankInfo />
          </div>
        </div>
      </div>

      {/* Contact Info Modal */}
      <ContactInfoModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
    </Layout>
  );
};

export default ProfileDashboard;
