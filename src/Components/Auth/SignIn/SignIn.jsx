import React, { useState } from "react";
import { create } from "../../../Api/Api"; // Adjust path if needed
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../../../Redux/UserSlice';
import ButtonLoader from "../../Shared/ButtonLoader";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      dispatch(signInStart());
      const response = await create("/auth/signin", { email:email, password:password });

      if (response.status === 200) {
        
        dispatch(signInSuccess(response.data));
        toast.success("Login successful!");
        navigate("/dashboard"); // Redirect to your desired route
      } else {
        toast.error(response.data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      dispatch(signInFailure(error.message || 'An unexpected error occurred'));
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-end min-h-screen bg-gray-400 p-5 pr-20">
      <div className="bg-white p-12 rounded-lg shadow-lg w-[670px] h-[700px] flex flex-col items-center">
        <div className="text-center mb-12 mt-12">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="text-3xl font-bold">Let's Get Some Work Done</p>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
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
              disabled={isSubmitting}
              className="cursor-pointer w-full bg-teal-600 text-white py-3 rounded-lg text-lg font-medium flex justify-center items-center gap-2 hover:bg-teal-700 transform hover:scale-105 transition duration-300"
            >
              {isSubmitting ? <ButtonLoader/> : "Login →"}
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
