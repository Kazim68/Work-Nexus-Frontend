import React from "react";

const LeaveSummary = () => {
  const leaveData = [
    { title: "Leave Taken", value: 10 },
    { title: "Total Leave", value: 30 },
    { title: "Casual Leaves Left", value: 5 },
    { title: "Sick Leave Left", value: 5 },
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-lg w-80 h-[333px]">
      <h2 className="text-gray-700 font-semibold mb-4 text-center">Leave Summary</h2>
      <div className="grid grid-cols-2 gap-6">
        {leaveData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center border rounded-full w-28 h-30 shadow-md"
          >
            <p className="text-gray-600 text-xs text-center">{item.title}</p>
            <div className="bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-base font-semibold">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveSummary;
