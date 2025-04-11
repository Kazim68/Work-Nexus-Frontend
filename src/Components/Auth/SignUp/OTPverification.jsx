import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { create } from "../../../Api/Api"; // Adjust if needed
import UpdateEmail from "./UpdateEmail"; // 🔄 Replace with actual path to UpdateEmail
import ButtonLoader from "../../Shared/ButtonLoader";

export default function OTPVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(180);
  const [canResend, setCanResend] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, "");
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3) inputRefs[index + 1].current.focus();
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) inputRefs[index - 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      setLoading(true);
      const response = await create("/otp/verifyotp", { email, otp: otpString });
      if (response.status === 200) {
        toast.success(response.data.message);
        setLoading(false);
        localStorage.removeItem("email");

        navigate("/pricing-plan");
      } else {
        setLoading(false);
        toast.error(response.data);
      }
    } catch (error) {
      setLoading(false);

      console.error("Error verifying OTP:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    try {
      setLoading(true);
      const response = await create("/otp/sendotp", { email });
      if (response.status === 200) {
        toast.success("OTP resent successfully.");
        setOtp(["", "", "", ""]);
        setTimer(180);
        setLoading(false);

        setCanResend(false);
      } else {
        setLoading(false);

        toast.error("Failed to resend OTP.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error resending OTP:", error);
      toast.error(error.message || "Failed to resend OTP.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-[#212020] px-4">
        <div className="bg-[#212020] p-10 rounded-2xl border border-amber-600 shadow-lg w-full max-w-md text-center min-h-[550px] space-y-6">
          <img
            src="https://img.icons8.com/ios-filled/50/d97706/new-post.png"
            alt="Email Icon"
            className="mx-auto mb-6"
          />
          <h2 className="text-2xl font-extrabold text-amber-600">Verify Your Account</h2>
          <p className="text-white">Check Your Email For OTP</p>
          <p className="text-white text-sm mt-4">
            Your email is {email}.{" "}
            <span
              onClick={() => setShowModal(true)}
              className="text-amber-600 font-medium hover:underline cursor-pointer"
            >
              Not Your Email?
            </span>
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
                className="w-14 h-14 text-2xl text-center rounded-lg bg-[#212020] border text-white border-amber-600 placeholder-white focus:outline-none focus:ring focus:ring-amber-600"
              />
            ))}
          </div>

          <p className="text-white text-sm">
            Didn’t Receive?{" "}
            {canResend ? (
              <span
                onClick={handleResend}
                className="text-amber-600 font-medium cursor-pointer"
              >
                Resend
              </span>
            ) : (
              <span className="font-semibold text-amber-600">{timer} s</span>
            )}
          </p>

          <button
            disabled={loading}
            onClick={verifyOtp}
            className="w-full bg-amber-600 font-bold text-gray-100 py-4 rounded-lg hover:bg-amber-700 cursor-pointer transition-all duration-300 ease-in-out  focus:shadow-outline focus:outline-none"
          >
            {loading ? (
              <ButtonLoader />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </div>

      {/* Modal Component */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-md transition-opacity duration-300 ease-in-out">
          <div className="bg-[#212020] rounded-lg p-8 w-full max-w-lg relative shadow-lg transform transition-all duration-300 ease-in-out opacity-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <UpdateEmail onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
