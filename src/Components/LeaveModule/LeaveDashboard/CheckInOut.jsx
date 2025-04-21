import { FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { createWithAuth } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CheckInOut = ({ today }) => {
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };


  const [currentTime, setCurrentTime] = useState(formatTime(new Date()))


  useEffect(() => {
    if (!data || !data.token) {
      toast.error('Unauthorized, Sign in again');
      navigate('/signin');
    }
  }, [data, navigate]);

  const employeeId = data.employee._id
  const token = data.token


  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const res = await createWithAuth(`/attendance/clockin/${employeeId}`, {
        clockInTime: new Date(), // Example: 9:30 AM

      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Clock-in successful!");
    } catch (error) {
      toast.error(error.message || "Clock-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const res = await createWithAuth(`/attendance/clockout/${employeeId}`, {
        clockOutTime: new Date(),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Clock-out successful!");
    } catch (error) {
      console.error(error)
      toast.error(error.message || "Clock-out failed.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex gap-4 p-4 rounded-lg w-full">
      {/* Check In */}
      <div className="flex-1 flex flex-col items-center rounded-lg shadow-sm group relative">
        <div className="flex items-center gap-2 p-4 border border-amber-600 rounded-sm w-full cursor-pointer">
          <div className="flex justify-center items-center w-12 h-12  rounded-full">
            <FaClock className="text-amber-600" size={24} />
          </div>
          <div>
            <p className="text-lg text-white font-semibold">
              {today?.clockInTime ? formatTime(today?.clockInTime) : currentTime}
            </p>

            <p className="text-sm text-white">{today?.clockInTime ? 'Clocked in' : 'Clock in'}</p>
          </div>
        </div>

        {/* Dropdown Button */}

        {!today?.clockInTime ? (
          <div className="absolute left-0 w-full opacity-0 invisible translate-y-[-10px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-18 transition-all duration-500 ease-in-out bg-white shadow-md rounded-lg">
            <button
              className="w-full bg-green-400 text-white py-2 font-semibold rounded-b-lg cursor-pointer"
              onClick={handleCheckIn}
              disabled={loading}
            >
              {loading ? "Checking In..." : "Check In"}
            </button>
          </div>):(<></>)}
      </div>

      {/* Check Out */}
      <div className="flex-1 flex flex-col items-center border border-amber-600 rounded-sm shadow-sm group relative">
        <div className="flex items-center gap-2 p-4 border-amber-600  w-full cursor-pointer">
          <div className="flex justify-center items-center w-12 h-12  rounded-full">
            <FaClock className="text-amber-600" size={24} />
          </div>
          <div>
          <p className="text-lg text-white font-semibold">{today?.clockOutTime ? formatTime(today?.clockOutTime) : currentTime}</p>
          
          <p className="text-sm text-white">{today?.clockOutTime ? 'Clocked Out' : 'Clock out'}</p>

          </div>
        </div>

        {today?.clockInTime ? (
        <div className="absolute left-0 w-full opacity-0 invisible translate-y-[-10px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-18 transition-all duration-500 ease-in-out bg-white shadow-md rounded-lg">
          <button
            className="w-full bg-red-400 text-white py-2 font-semibold rounded-b-lg cursor-pointer"
            onClick={handleCheckOut}
            disabled={loading}
          >
            {loading ? "Checking Out..." : "Check Out"}
          </button>
        </div>):(<></>)}
      </div>
    </div>
  );
};

export default CheckInOut;
