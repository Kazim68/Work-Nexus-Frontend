import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "../../../assets/images/lock.png";
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
      const response = await create("/send-recovery-link", { email:email });

      if (response.status === 200) {
        toast.success("Email sent successfully!");
        localStorage.setItem("email" , email)

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
    <div className="flex items-center justify-end h-screen bg-gray-300 p-4 pr-16">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[670px] h-[730px] flex flex-col items-center">
        <div className="flex w-full justify-end mb-8">
          <img src={LockIcon} alt="Lock Icon" className="w-24 h-24" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-3 mt-4">
          Oh No! You Forgot Your Password.
        </h2>
        <p className="text-lg font-semibold text-center mb-6">
          Don’t Worry, We Got Backups.
        </p>

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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-3/4 bg-teal-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition duration-300 flex justify-center items-center gap-2"
          >
            {isSubmitting ? <ButtonLoader /> : "Send Email →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
