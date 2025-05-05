import React, { useState } from "react";
import { FaPrint } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const PaySlip = ({ onClose }) => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 2)); // March 2025

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentDate);
        prevMonth.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(nextMonth);
    };

    const monthYear = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

    const earnings = [
        { label: "Basic Salary", amount: "Rs. 73,337" },
        { label: "House Allowance", amount: "Rs. 0" },
        { label: "Utilities", amount: "Rs. 8,800" },
        { label: "Medical Expenses", amount: "Rs. 11,000" },
        { label: "Fuel Allowance", amount: "Rs. 12,850" },
    ];

    const deductions = [
        { label: "EOBI", amount: "Rs. 370" },
        { label: "Tax Adjustment", amount: "Rs. 2,500" },
        { label: "Employee PF Funds", amount: "Rs. 6,100" },
    ];

    const contributions = [
        { label: "Employee PF Contribution", amount: "Rs. 87,250" },
        { label: "Employer PF Contribution", amount: "Rs. 87,250" },
    ];

    const leaveBalances = [
        { label: "Sick Leaves", amount: "6.00" },
        { label: "Casual Leaves", amount: "7.60" },
        { label: "CPL", amount: "0.79" },
        { label: "Annual Leaves", amount: "14.00" },
    ];

    const totalEarnings = 73337 + 0 + 8800 + 11000 + 12850;
    const totalDeductions = 370 + 2500 + 6100;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2f2f30] text-white rounded-lg overflow-y-auto max-h-[90vh] w-full max-w-5xl relative p-6">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-orange-400 text-2xl"
                >
                    <IoMdClose />
                </button>

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-6 gap-4">
                    <h1 className="text-lg font-semibold text-center sm:text-left">
                        PaySlip - <span className="text-orange-400">Month of {monthYear}</span>
                    </h1>
                    <div className="flex gap-2">
                        <button className="bg-orange-400 px-4 py-1 rounded flex items-center gap-2 font-semibold">
                            <FaPrint /> Print
                        </button>
                        <button className="bg-orange-400 px-4 py-1 rounded flex items-center gap-2 font-semibold">
                            <MdEmail /> Email
                        </button>
                        <button className="bg-orange-400 px-4 py-1 rounded flex items-center gap-2 font-semibold">
                            <FaRegFilePdf /> PDF
                        </button>
                    </div>
                </div>

                {/* Employee Info */}
                <div className="border border-orange-400 p-4 rounded w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-6">
                    <div>
                        <p><span className="text-gray-300">Name -</span> <span className="text-orange-400">Malick Barr</span></p>
                        <p><span className="text-gray-300">Department -</span> <span className="text-orange-400">Data Science</span></p>
                    </div>
                    <div>
                        <p><span className="text-gray-300">Employee ID -</span> <span className="text-orange-400">EMP-101</span></p>
                        <p><span className="text-gray-300">Joining Date -</span> <span className="text-orange-400">12/03/2025</span></p>
                    </div>
                    <div>
                        <p><span className="text-gray-300">Designation -</span> <span className="text-orange-400">Data Scientist</span></p>
                        <p><span className="text-gray-300">Employee Status -</span> <span className="text-orange-400">Permanent</span></p>
                    </div>
                </div>

                {/* Salary Details */}
                <div className="flex flex-wrap justify-between w-full gap-4">
                    {/* Earnings */}
                    <div className="border border-orange-400 rounded w-full sm:w-[32%]">
                        <div className="bg-orange-400 text-black text-center font-bold p-2">Earnings</div>
                        <div className="p-3 text-sm space-y-2">
                            {earnings.map((item, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <span>{item.label}</span>
                                    <span className="text-orange-400">{item.amount}</span>
                                </div>
                            ))}
                            <div className="w-full h-[1px] bg-orange-400 my-2"></div>
                            <div className="flex justify-between font-semibold mt-2">
                                <span>Total Earning</span>
                                <span className="text-orange-400">Rs. {totalEarnings.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Deductions */}
                    <div className="border border-orange-400 rounded w-full sm:w-[32%]">
                        <div className="bg-orange-400 text-black text-center font-bold p-2">Deductions</div>
                        <div className="p-3 text-sm space-y-2">
                            {deductions.map((item, idx) => (
                                <div key={idx} className="flex justify-between">
                                    <span>{item.label}</span>
                                    <span className="text-orange-400">{item.amount}</span>
                                </div>
                            ))}
                            <div className="w-full h-[1px] bg-orange-400 my-2"></div>
                            <div className="flex justify-between font-semibold mt-2">
                                <span>Total Deduction</span>
                                <span className="text-orange-400">Rs. {totalDeductions.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contributions & Leave */}
                    <div className="border border-orange-400 rounded w-full sm:w-[32%] flex flex-col">
                        <div>
                            <div className="bg-orange-400 text-black text-center font-bold p-2">Total Contributions</div>
                            <div className="p-3 text-sm space-y-2">
                                {contributions.map((item, idx) => (
                                    <div key={idx} className="flex justify-between">
                                        <span>{item.label}</span>
                                        <span className="text-orange-400">{item.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-t border-gray-500">
                            <div className="bg-orange-400 text-black text-center font-bold p-2">Leave Balances</div>
                            <div className="p-3 text-sm space-y-2">
                                {leaveBalances.map((item, idx) => (
                                    <div key={idx} className="flex justify-between">
                                        <span>{item.label}</span>
                                        <span className="text-orange-400">{item.amount}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center w-full">
                    <h2 className="font-bold text-lg">Company Name</h2>
                    <div className="flex justify-center items-center gap-4 mt-2 text-sm">
                        <button onClick={handlePrevMonth} className="text-orange-400">&lt;</button>
                        <span className="text-gray-300">{monthYear}</span>
                        <button onClick={handleNextMonth} className="text-orange-400">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaySlip;
