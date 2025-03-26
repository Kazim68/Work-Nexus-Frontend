import React, { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");
    // Proceed with login
  };

  return (
    <div className="flex items-center justify-end min-h-screen bg-gray-400 p-5 pr-20">
      <div className="bg-white p-12 rounded-lg shadow-lg w-[670px] h-[700px] flex flex-col items-center">
        {/* Adjusted top margin */}
        <div className="text-center mb-12 mt-12">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-3xl font-bold">Let's Get Some Work Done</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {/* Increased font size of labels and equal spacing */}
          <div className="mb-8 w-3/4">
            <label className="block text-[#4D5959] font-semibold text-lg mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email here"
              className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-8 w-3/4">
            <label className="block text-[#4D5959] font-semibold text-lg mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-center items-center mb-8 w-3/4">
            <button
              type="submit"
              className="cursor-pointer w-full bg-teal-600 text-white py-3 rounded-lg text-lg font-medium flex justify-center items-center gap-2 hover:bg-teal-700 transform hover:scale-105 transition duration-300"
            >
              Login →
            </button>
          </div>
          <p className="text-center text-gray-600 text-sm">
            Forgot Password?{" "}
            <a href="/forgot-password" className="text-blue-500 font-semibold">
              Click Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
