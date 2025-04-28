import React, {useState, useEffect} from "react";
import { FaCalendarAlt, FaUmbrellaBeach, FaSadTear } from "react-icons/fa"; // Example icons
import { getLeaveSummary } from '../../Api/Employee/Leaves';
import { useSelector } from "react-redux";

const leaveTemplate = [
    {
        label: "Leave Taken",
        icon: <FaCalendarAlt size={30} className="text-red-400" />,
    },
    {
        label: "Leave Balance",
        icon: <FaUmbrellaBeach size={30} className="text-pink-400" />,
    },
    {
        label: "Sick Leave",
        icon: <FaSadTear size={30} className="text-yellow-400" />,
    },
];


const LeaveInfoCards = () => {

    const [leaveData, setLeaveData] = useState([]);
    const { data } = useSelector((state) => state.user);
    const employeeId = data?.employee?._id;

    useEffect(() => {
        const fetchLeaveSummary = async () => {
            try {
                const response = await getLeaveSummary(employeeId);
                if (response.success) {
                    const { LeavesTaken, AnnualLeaves, SickLeaves } = response.leaveSummary;
    
                    const newLeaveData = [
                        { ...leaveTemplate[0], count: LeavesTaken },
                        { ...leaveTemplate[1], count: AnnualLeaves - LeavesTaken },
                        { ...leaveTemplate[2], count: SickLeaves },
                    ];
    
                    setLeaveData(newLeaveData);
                } else {
                    console.error("Error fetching leave requests");
                }
            } catch (error) {
                console.error("Error fetching leave requests:", error);
            }
        };
    
        fetchLeaveSummary();
    }, []);
    

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
