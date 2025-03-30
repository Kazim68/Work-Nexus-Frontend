import { FaCalendarTimes, FaCalendarCheck, FaBalanceScale, FaHeartbeat } from "react-icons/fa";


const LeaveStats = () => {
  const stats = [
    { icon: <FaCalendarTimes className="text-red-400 text-3xl" />, value: "10", label: "Leave Taken" },
    { icon: <FaCalendarCheck className="text-green-400 text-3xl" />, value: "30", label: "Total Leave" },
    { icon: <FaBalanceScale className="text-red-500 text-3xl" />, value: "05", label: "Leave Balance" },
    { icon: <FaHeartbeat className="text-yellow-400 text-3xl" />, value: "05", label: "Sick Leave" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-full">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col p-4 rounded-lg shadow-md text-left">
          <div className="flex items-center w-full mb-2">
            <p className="text-xl font-bold flex-1">{stat.value}</p>
            <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full">
              {stat.icon}
            </div>
          </div>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default LeaveStats