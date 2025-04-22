import React from "react";

const payslips = [
    { month: "March - 2025", isNew: true, link: "#" },
    { month: "February - 2025", link: "#" },
    { month: "January - 2025", link: "#" },
    { month: "December - 2024", link: "#" },
    { month: "November - 2024", link: "#" },
    { month: "October - 2024", link: "#" },
];

const PayslipList = () => {
    return (
        <div
            className="border border-[#F99932] rounded-md bg-[#2f2f30] text-white w-full p-4 h-[400px]"
        >
            {/* Title */}
            <h2 className="text-white text-lg font-semibold mb-4">My Monthly Payslips</h2>

            {/* Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-orange-400 font-semibold text-base">Payslip Period</h3>
            </div>

            {/* Underline below header */}
            <div className="w-full h-[2px] bg-[#F99932] mt-1 mb-3" />

            {/* List of Payslips */}
            <div className="space-y-3">
                {payslips.map((item, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{item.month}</span>
                                {item.isNew && <span className="text-red-400 font-semibold">new</span>}
                            </div>
                            <a
                                href={item.link}
                                className="text-sky-400 font-semibold hover:underline"
                            >
                                View Payslip
                            </a>
                        </div>
                        {/* Divider except after last item */}
                        {index !== payslips.length - 1 && (
                            <hr className="border-gray-300 mt-2" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PayslipList;
