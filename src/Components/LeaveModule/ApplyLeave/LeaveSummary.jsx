import React from "react";

const LeaveSummary = () => {
  const leaveData = [
    { title: "Leave Taken", value: 10 },
    { title: "Total Leave", value: 30 },
    { title: "Casual Leaves Left", value: 5 },
    { title: "Sick Leave Left", value: 5 },
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
