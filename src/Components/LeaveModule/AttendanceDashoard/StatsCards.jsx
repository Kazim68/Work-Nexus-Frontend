import { FaClock, FaBriefcase, FaStopwatch } from "react-icons/fa";

const stats = [
  { icon: <FaClock className="text-green-400 text-2xl" />, time: "9:30 am", label: "Today Clock In" },
  { icon: <FaClock className="text-blue-400 text-2xl" />, time: "9:30 pm", label: "Today Clock Out" },
  { icon: <FaBriefcase className="text-orange-400 text-2xl" />, time: "75 hr", label: "Total Working hr" },
  { icon: <FaStopwatch className="text-red-400 text-2xl" />, time: "20 hr", label: "Total Over Time" },
];

const StatsCards = () => {
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
