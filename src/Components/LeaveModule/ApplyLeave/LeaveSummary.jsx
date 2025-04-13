import React, { useEffect, useState  } from "react";
import { getUserInfo } from '../../../utils/getUserInfo.js';
import { getLeaveSummary } from '../../../Api/Employee/Leaves.js';

const LeaveSummary = () => {
  const userInfo = getUserInfo(); 
  const [leaveSummary, setLeaveSummary] = useState(null);

  useEffect(() => {
    const fetchLeaveSummary = async () => {
      try {
        const response = await getLeaveSummary();
        console.log(response);
        if (response?.success) {
          setLeaveSummary(response.leaveSummary);
        }
      } catch (error) {
        console.error("Error fetching leave summary:", error);
      }
    };

    fetchLeaveSummary();
  }, []);

  const leaveData = [
    { title: "Leave Taken", value: (leaveSummary.LeavesTaken || 0)},
    { title: "Annual Leave", value: leaveSummary?.AnnualLeaves || 0 },
    { title: "Unpaid Leaves", value: leaveSummary?.UnpaidLeaves || 0 },
    { title: "Sick Leave", value: leaveSummary?.SickLeaves || 0 },
  ];
  return (
    <div className="shadow-md p-4 rounded-lg w-80 h-[333px] border border-amber-600">
      <h2 className="text-white font-semibold mb-4 text-center">Leave Summary</h2>
      <div className="grid grid-cols-2 gap-6 ">
        {leaveData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border border border-amber-600 rounded-full w-28 h-30 shadow-md"
          >
            <p className="text-white text-xs text-center">{item.title}</p>
            <div className="bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-semibold">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveSummary;
