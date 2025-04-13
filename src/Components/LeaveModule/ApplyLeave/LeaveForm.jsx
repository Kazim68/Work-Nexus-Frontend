import React from "react";
import { getUserInfo } from '../../../utils/getUserInfo.js';
import { applyLeave } from '../../../Api/Employee/Leaves.js';
import ButtonLoader from "../../Shared/ButtonLoader.jsx";
import { toast } from "react-toastify";
import { LEAVE_TYPES } from '../../../utils/constants.js';

const LeaveForm = () => {
  const userInfo = getUserInfo();
  const [leaveType, setLeaveType] = React.useState("");
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    const newErrors = {};
    if (!leaveType) newErrors.leaveType = "Leave type is required";
    if (!fromDate) newErrors.fromDate = "From date is required";
    if (!toDate) newErrors.toDate = "To date is required";
    if (!reason) newErrors.reason = "Reason is required";
    if (new Date(fromDate) > new Date(toDate)) {
      newErrors.date = "From date cannot be after To date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    setLoading(true);

    try {
      const response = await applyLeave(fromDate, toDate, leaveType, reason);
      if (!response.success) {
        toast.error(response.message);
        setErrors({ submit: response.message });
        return;
      }
      toast.success("Leave application submitted successfully!");
      
      setLeaveType("");
      setFromDate("");
      setToDate("");
      setReason("");
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      setErrors({ submit: message });
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-amber-600 p-8 rounded-2xl shadow-md w-full min-h-[630px]">
      <h2 className="text-xl font-semibold mb-6 text-amber-600">Leave Application Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label className="block text-sm font-medium text-white">Employee Id - {userInfo?.employee?._id}</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Name - {userInfo?.employee?.firstName} {userInfo?.employee?.lastName}</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-white">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#212020] border border-amber-600 text-sm text-white focus:outline-none"
          />
          {errors.fromDate && <p className="text-red-500 text-sm">{errors.fromDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Leave Type</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#212020] border border-amber-600 placeholder-white text-sm text-white focus:outline-none focus:ring focus:ring-amber-600"
          >
            <option value="" disabled>Select Leave Type</option>
            {LEAVE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {errors.leaveType && <p className="text-red-500 text-sm">{errors.leaveType}</p>}
        </div>
      

        <div>
          <label className="block text-sm font-medium text-white">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#212020] border border-amber-600 text-sm text-white focus:outline-none"
          />
          {errors.toDate && <p className="text-red-500 text-sm">{errors.toDate}</p>}
        </div>

      </div>

      {errors.date && <p className="text-red-500 mt-2 text-sm">{errors.date}</p>}

      <div className="mt-8">
        <label className="block text-sm font-medium text-white">Reason for Leave</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#212020] h-32 border border-amber-600 text-sm text-white focus:outline-none"
        ></textarea>
        {errors.reason && <p className="text-red-500 text-sm">{errors.reason}</p>}
      </div>

      {errors.submit && (
        <p className="text-red-500 text-center mt-4">{errors.submit}</p>
      )}

      <div className="flex justify-center mt-10">
      <button
          type="submit"
          disabled={loading}
          onClick={submitHandler}
          className="bg-amber-600 text-white px-7 py-2 rounded-lg cursor-pointer text-sm font-medium hover:bg-amber-700 disabled:opacity-50"
        >
          {loading ? <ButtonLoader /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default LeaveForm;
