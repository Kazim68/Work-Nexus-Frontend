import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "../../../assets/images/lock.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex items-center justify-end h-screen bg-gray-300 p-4 pr-16">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[670px] h-[730px] flex flex-col items-center">
        {/* Lock Icon with spacing */}
        <div className="flex w-full justify-end mb-8">
          <img src={LockIcon} alt="Lock Icon" className="w-24 h-24" />
        </div>

        {/* Increased text size & added margin */}
        <h2 className="text-2xl font-bold text-center mb-3 mt-4">
          Oh No! You Forgot Your Password.
        </h2>
        <p className="text-lg font-semibold text-center mb-6">
          Don’t Worry, We Got Backups.
        </p>

        {/* Centered Input Field */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <label className="block text-gray-700 text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email here"
            className="w-3/4 p-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 mb-6 text-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          {/* Centered Button */}
          <button
            type="submit"
            className="w-3/4 bg-teal-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition duration-300"
            onClick={() => navigate("/verify")}
          >
            Send Email →
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
