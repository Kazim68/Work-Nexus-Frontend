import React from "react";
import { FaCalendarAlt, FaUmbrellaBeach, FaSadTear } from "react-icons/fa"; // Example icons

const leaveData = [
    {
        count: "10",
        label: "Leave Taken",
        icon: <FaCalendarAlt size={30} className="text-red-400" />, // Adjusted icon size
    },
    {
        count: "05",
        label: "Leave Balance",
        icon: <FaUmbrellaBeach size={30} className="text-pink-400" />, // Adjusted icon size
    },
    {
        count: "05",
        label: "Sick leave",
        icon: <FaSadTear size={30} className="text-yellow-400" />, // Adjusted icon size
    },
];

const LeaveInfoCards = () => {
    return (
        <div className="flex flex-col gap-3">
            {leaveData.map((item, index) => (
                <div
                    key={index}
                    className="border border-orange-500 rounded-md bg-[#2e2e2e] text-white p-2 flex flex-col items-center w-28 h-31"
                >
                    <div className="bg-white rounded-full p-1 mb-2">{item.icon}</div>
                    <div className="text-orange-400 font-bold text-sm">{item.count}</div>
                    <div className="text-xs mt-1 text-center">{item.label}</div>
                </div>
            ))}
        </div>
    );
};

export default LeaveInfoCards;
