import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
  };

  let navigate = useNavigate();

  return (


    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 min-h-[500px] flex flex-col justify-center">
        <div className="flex justify-center mb-4">
        <img 
            src="https://cdn-icons-png.flaticon.com/512/61/61457.png" 
            alt="Lock Icon" 
            className="w-12 h-12"
          />
        </div>
        <h2 className="text-xl font-semibold text-center mb-2">
          Oh No! You Forgot Password.
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Don’t Worry, We Got Backups.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your Email here"
            className="w-full p-2 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 flex justify-center items-center gap-2"
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
