import { FaClock, FaBriefcase, FaStopwatch } from "react-icons/fa";



const StatsCards = ({ todayData, totalHours, overtime }) => {


  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };


  const stats = [
    {
      icon: <FaClock className="text-green-400 text-2xl" />,
      time: formatTime(todayData?.clockInTime || new Date()),
      label: todayData?.clockInTime ? "Today Clock In" : "Not Clocked In Today"
    },
    {
      icon: <FaClock className="text-blue-400 text-2xl" />, 
      time: formatTime(todayData?.clockOutTime || new Date()),
      label: todayData?.clockOutTime ? "Today Clock Out" : "Not Clocked Out Today"
    },
    { icon: <FaBriefcase className="text-orange-400 text-2xl" />, time: totalHours, label: "Total Working hr" },
    { icon: <FaStopwatch className="text-red-400 text-2xl" />, time: overtime, label: "Total Over Time" },
  ];





  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 h-full">
      {stats.map((stat, index) => (
        <div key={index} className="border border-amber-600 p-4 rounded-lg shadow-md flex items-center gap-3 h-full">
          <div className="flex justify-center items-center w-12 h-12  rounded-full">
            {stat.icon}
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{stat.time}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
