import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import keyIcon from "../../../assets/images/key.png";
import { toast } from 'react-toastify';
import { useQuery } from "@tanstack/react-query";
import { create, fetchWithQueryParams } from '../../../Api/Api';
import ButtonLoader from '../../Shared/ButtonLoader';
import Loader from '../../Shared/Loader';
import Error404 from '../../Shared/Error404';

export default function PasswordReset() {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isTokenValid, setIsTokenValid] = useState(true); // Flag for token validity
  const [IsSubmiting, setIsSubmiting] = useState(false);

  const token = new URLSearchParams(window.location.search).get('token');
  const email = localStorage.getItem("email");

  const { data, error, isLoading } = useQuery({
    queryKey: ['verify', token],
    queryFn: () => fetchWithQueryParams('/reset-password/verify-token', { token }), // Use object for query params
    enabled: !!token,  // The query will only run if token exists
    staleTime: 0,
    cacheTime: 0,
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (data) {
      setIsTokenValid(true);
    } else if (error) {
      console.error("Error:", error);
      toast.error("Invalid or expired token.");
      setIsTokenValid(false);
    }
  }, [data, error, isLoading, navigate]);

  // Render the loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  // Render error or success states
  if (!isTokenValid) {
    return <Error404 />;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!newPassword || newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (!confirmPassword || confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmiting(true);
      const response = await create("/reset-password/update-password", { email: email, password: newPassword });
      if (response.status === 200) {
        toast.success(response.data.message);
        setIsSubmiting(false);
        localStorage.removeItem("email");
        navigate("/signin");
      } else {
        setIsSubmiting(false);
        toast.error(response.data);
      }
    } catch (error) {
      setIsSubmiting(false);
      console.error("Error verifying OTP:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  if (!isTokenValid) {
    return null; // If token is not valid, don't show the form (or navigate to 404 page)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#212020] p-4">
      <div className="bg-[#212020] border border-amber-600 p-10 rounded-lg shadow-lg">
        <div className="flex justify-end mb-8">
          <img
            src={keyIcon}
            alt="success-key"
            className="w-16 h-16"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-amber-600">Reset Your Password</h2>
        <p className="text-xl font-medium mb-6 text-white">Please enter a new password and confirm it.</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full p-4 rounded-lg bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600 mb-2`}
              placeholder="Enter new password"
            />
            <img
              src={showPassword ? "https://img.icons8.com/ios-glyphs/30/d97706/invisible.png" : "https://img.icons8.com/ios-glyphs/30/d97706/visible--v1.png"}
              alt="eye"
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-4 rounded-lg bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600 mb-2`}
              placeholder="Confirm your password"
            />
            <img
              src={showConfirmPassword ? "https://img.icons8.com/ios-glyphs/30/d97706/invisible.png" : "https://img.icons8.com/ios-glyphs/30/d97706/visible--v1.png"}
              alt="eye"
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 cursor-pointer text-white py-3 rounded-lg text-lg font-medium hover:bg-amber-700"
          >
            {IsSubmiting ? (
              <ButtonLoader />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
