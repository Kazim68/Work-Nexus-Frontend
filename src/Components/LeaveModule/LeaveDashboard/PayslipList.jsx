import React, { useState, useEffect } from "react";
import { getAllMyPayrolls } from "../../../Api/Employee/Payroll";
import { useNavigate } from 'react-router-dom';

const PayslipList = () => {
  const [payrolls, setPayrolls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const response = await getAllMyPayrolls();
        if (response.error) {
          console.error('Error fetching payrolls:', response.error);
          return;
        }
        setPayrolls(response.payrolls);
      } catch (error) {
        console.error('Error fetching payrolls:', error);
      }
    };

    fetchPayrolls();
  }, [])

  const handleViewPayslip = (payslip) => {
    const paddedMonth = payslip.Month.toString().padStart(2, '0');
    console.log(payslip.Month, paddedMonth)
    navigate(`/payslip/${payslip.EmployeeID}/${payslip.Year}/${paddedMonth}`);

  };


  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const payslips = payrolls.map((payroll, index) => {
    const monthIndex = parseInt(payroll.Month, 10) - 1; // Convert "04" to 3
    const monthName = monthNames[monthIndex] || "Unknown";

    return {
      month: monthName,
      year: payroll.Year,
      isNew: index === 0, // Example: mark the most recent as new
      ...payroll,
    };
  });

  return (
    <div className="w-full h-full bg-[#212020] border border-orange-500 rounded-lg p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-amber-500 mb-3">Payslip Period</h3>
      <ul className="space-y-4">
        {payslips.map(({ month, year, isNew, ...rest }, index) => (
          <li key={index} className="border-b border-gray-500 pb-1 flex justify-between items-center text-sm text-white">
            <div className="flex items-center gap-2">
              <span className="font-medium">{`${month} - ${year}`}</span>
              {isNew && (
                <span className="text-xs text-red-500 font-bold">new</span>
              )}
            </div>
            <button
              onClick={() => handleViewPayslip({ month, year, ...rest })}
              className="text-blue-400 hover:underline"
            >
              View Payslip
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PayslipList;
