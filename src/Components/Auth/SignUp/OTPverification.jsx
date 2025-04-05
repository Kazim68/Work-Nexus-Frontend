import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Make sure to import and use react-toastify
import { create } from "../../../Api/Api"; // Adjust the import path if needed

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, ""); // Only allow digits
    const newOtp = [...otp]; // Make a copy of the OTP array

    if (value) {
      // Update OTP array and move focus to next input if value is entered
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input if the current one has a value
      if (index < 3 && value) {
        inputRefs[index + 1].current.focus();
      }
    } else {
      // If backspace is pressed (or a character is deleted), remove the value from OTP
      newOtp[index] = "";
      setOtp(newOtp);

      // Move focus to previous input if backspace is pressed
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus(); // Move focus if the current input is empty
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const response = await create("/verifyotp", { email: email, otp: otpString });
      console.log(response)
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/orgInfo");
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const response = await create("/sendotp", { email });

      if (response.status === 200) {
        toast.success("OTP resent successfully.");
        setOtp(["", "", "", ""]);
        setTimer(60);
        setCanResend(false);
      } else {
        toast.error("Failed to resend OTP.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error(error.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md text-center min-h-[550px] space-y-6">
        <img
          src="https://img.icons8.com/ios-filled/50/000000/new-post.png"
          alt="Email Icon"
          className="mx-auto mb-6"
        />
        <h2 className="text-2xl font-semibold">Verify Your Account</h2>
        <p className="text-gray-600">Check Your Email For OTP</p>
        <p className="text-gray-500 text-sm mt-4">
          Your email is {email}.{" "}
          <span className="text-teal-600 font-medium cursor-pointer">Not Your Email?</span>
        </p>

        <div className="flex justify-center gap-4 my-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={inputRefs[index]}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-2xl text-center rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          ))}
        </div>

        <p className="text-gray-500 text-sm">
          Didn’t Receive?{" "}
          {canResend ? (
            <span onClick={handleResend} className="text-teal-600 font-medium cursor-pointer">Resend</span>
          ) : (
            <span className="font-semibold">{timer}</span>
          )}
        </p>

        <button
          onClick={verifyOtp}
          className="cursor-pointer w-full bg-teal-600 text-white py-4 rounded-lg text-lg font-medium mt-6 hover:bg-teal-700"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
