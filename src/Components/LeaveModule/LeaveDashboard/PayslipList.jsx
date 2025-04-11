import React from "react";

const PayslipList = () => {
  const payslips = [
    { month: "March", year: 2025, isNew: true },
    { month: "February", year: 2025 },
    { month: "January", year: 2025 },
    { month: "December", year: 2024 },
    { month: "November", year: 2024 },
    { month: "October", year: 2024 },
  ];

  return (
    <div className="w-full h-full bg-[#212020] border border-orange-500 rounded-lg p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-amber-500 mb-3">Payslip Period</h3>
      <ul className="space-y-4">
        {payslips.map(({ month, year, isNew }, index) => (
          <li key={index} className="border-b border-gray-500 pb-1 flex justify-between items-center text-sm text-white">
            <div className="flex items-center gap-2">
              <span className="font-medium">{`${month} - ${year}`}</span>
              {isNew && (
                <span className="text-xs text-red-500 font-bold">new</span>
              )}
            </div>
            <a href="#" className="text-blue-400 hover:underline">View Payslip</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PayslipList;
