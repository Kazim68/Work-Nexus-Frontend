import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changePassword } from "../../Api/Employee/Employee";
import { getUserInfo } from "../../utils/getUserInfo";

const ChangePassword = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    repeat: false,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W])(?=\S+$)(?!.*[|]).{8,}$/;
    return regex.test(password);
  };

  const handleReset = async () => {
    setError("");
    setMessage("");

    if (!newPassword || !repeatPassword) {
      setError("Both fields are required.");
      return;
    }

    if (newPassword !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError("Password does not meet the criteria.");
      return;
    }

    try {
      const user = getUserInfo();
      const employeeId = user?.employee?._id;

      if (!employeeId) {
        setError("Employee ID not found.");
        return;
      }

      const res = await changePassword(newPassword);
      setMessage("Password updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur-sm">
      <div className="p-8 rounded-2xl border-2 border-amber-600 shadow-lg w-[500px]">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Change Password</h2>

        <div className="space-y-6">
          {["new", "repeat"].map((field, index) => (
            <div key={index} className="relative">
              <label className="block text-white text-md font-semibold mb-2">
                {field === "new" ? "New Password:" : "Repeat Password:"}
              </label>
              <input
                type={showPasswords[field] ? "text" : "password"}
                className="w-full p-3 bg-white text-black rounded-md border-2 border-amber-600 focus:outline-none pr-12"
                value={field === "new" ? newPassword : repeatPassword}
                onChange={(e) =>
                  field === "new"
                    ? setNewPassword(e.target.value)
                    : setRepeatPassword(e.target.value)
                }
              />
              <span
                className="absolute right-4 top-11 transform -translate-y-1/2 cursor-pointer text-gray-700"
                onClick={() => togglePasswordVisibility(field)}
              >
                {showPasswords[field] ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          ))}
        </div>

        {message && <p className="text-green-400 mt-4 text-sm">{message}</p>}
        {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}

        <div className="flex justify-between mt-8">
          <button
            className="px-6 py-2 bg-amber-600 text-black rounded-full font-semibold hover:bg-amber-500 transition"
            onClick={handleReset}
          >
            Save
          </button>
          <button
            className="px-6 py-2 border-2 border-amber-600 text-white rounded-full font-semibold hover:bg-white hover:text-amber-600 transition"
            onClick={onClose}
          >
            Back
          </button>
        </div>

        <div className="mt-6">
          <p className="text-sm text-white leading-6">
            <span className="font-bold">Password must:</span><br />
            - include lowercase and uppercase letters<br />
            - include at least 1 number or symbol<br />
            - be at least 8 characters long<br />
            - match in both fields<br />
            - cannot contain spaces or '|' symbol
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;