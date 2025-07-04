import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const LockIcon = "https://d194k6uxa928vc.cloudfront.net/assets/images/lock.png";
import { toast } from "react-toastify";
import { create } from "../../../Api/Api";
import ButtonLoader from "../../Shared/ButtonLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await create("reset-password/send-recovery-link", { email: email });

      if (response.status === 200) {
        toast.success("Email sent successfully!");
        localStorage.setItem("email", email);
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#212020] p-4 pr-16">
      <div className="bg-[#212020] p-10 border border-amber-600 rounded-lg shadow-lg flex flex-col items-center">
        <div className="flex w-full justify-center mb-8">
          <img src={LockIcon} alt="Lock Icon" className="w-24 h-24" />
        </div>

        <h2 className="text-2xl font-extrabold text-center mb-3 mt-4 text-amber-600">
          Oh No! You Forgot Your Password.
        </h2>
        <p className="text-lg font-semibold text-center mb-6 text-white">
          Don’t Worry, We Got Backups.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          {/* Email Input */}
          <label className="block text-white text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email here"
            className="w-full p-4 rounded-lg bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600 mb-6"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-amber-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-amber-700 transition-all duration-300 flex justify-center items-center gap-2"
          >
            {isSubmitting ? <ButtonLoader /> : "Send Email →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
