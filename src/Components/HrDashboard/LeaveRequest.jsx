import React from "react";

const leaveData = [
  {
    id: "101",
    fromDate: "24/11/2023",
    toDate: "02/12/2023",
    days: 8,
    type: "Sick Leave",
    link: "#",
  },
  {
    id: "102",
    fromDate: "24/11/2023",
    toDate: "02/12/2023",
    days: 8,
    type: "Sick Leave",
    link: "#",
  },
  {
    id: "103",
    fromDate: "24/11/2023",
    toDate: "02/12/2023",
    days: 8,
    type: "Sick Leave",
    link: "#",
  },
  {
    id: "104",
    fromDate: "24/11/2023",
    toDate: "02/12/2023",
    days: 8,
    type: "Sick Leave",
    link: "#",
  },
  {
    id: "105",
    fromDate: "24/11/2023",
    toDate: "02/12/2023",
    days: 8,
    type: "Sick Leave",
    link: "#",
  },
];

const LeaveRequests = () => {
  return (
    <div className="border border-[#F99932] rounded-md bg-[#333334] text-white w-[800px] max-w-4xl p-0 overflow-x-auto">
      {/* Header */}
      <div className="px-4 pt-4">
        <h2 className="font-semibold text-base">Leave Requests</h2>
      </div>

      {/* Full-width orange line */}
      <div className="w-full h-[2px] bg-[#F99932] my-2" />

      {/* Table */}
      <div className="p-2">
        <table className="w-full text-sm border-collapse rounded overflow-hidden table-fixed">
          <thead>
            <tr className="bg-[#2a2a2a] text-white text-left">
              <th className="border px-3 py-2">Emp ID</th>
              <th className="border px-3 py-2">From Date</th>
              <th className="border px-3 py-2">To Date</th>
              <th className="border px-3 py-2">No. of Days</th>
              <th className="border px-3 py-2">Leave Type</th>
              <th className="border px-3 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave, index) => (
              <tr
                key={index}
                className="text-white bg-gray-700 border border-white"
              >
                <td className="border px-3 py-2 font-semibold">{leave.id}</td>
                <td className="border px-3 py-2">{leave.fromDate}</td>
                <td className="border px-3 py-2">{leave.toDate}</td>
                <td className="border px-3 py-2">{leave.days}</td>
                <td className="border px-3 py-2">{leave.type}</td>
                <td className="border px-3 py-2">
                  <a
                    href={leave.link}
                    className="text-sky-400 font-semibold hover:underline"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequests;
