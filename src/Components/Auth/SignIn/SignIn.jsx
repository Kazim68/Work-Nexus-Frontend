import React from "react";

const SignIn = () => {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
            alt="HRM Logo"
            className="w-16 h-16"
          />
          <h2 className="text-xl font-semibold">Welcome Back!</h2>
          <p className="text-gray-600">Let's Get Some Work Done</p>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your Email here"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg text-lg font-medium flex justify-center items-center gap-2 hover:bg-teal-700"
            >
              Login  <span className="ml-2">➡️</span>
            </button>
          </div>
          <p className="text-center text-gray-600">
            Forgot Password?{" "}
            <a href="/forgot-password" className="text-blue-500">
              Click Here
            </a>
          </p>
        </form>

        {/* OR Section with Horizontal Lines */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="flex flex-col gap-4">
          <button className="w-full flex items-center justify-center py-3 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-100">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign In with Google
          </button>
          <button className="w-full flex items-center justify-center border-gray-400 py-3 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-100">
            <img
              src="https://img.icons8.com/color/48/000000/microsoft-outlook-2019.png"
              alt="Outlook"
              className="w-5 h-5 mr-2"
            />
            Sign In With Outlook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
