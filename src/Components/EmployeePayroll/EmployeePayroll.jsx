import React from 'react'
import Layout from '../Layout/Layout'
import bgImg from '../../assets/Landing Page Icons/Background Pics/2052-3-1.jpg'
import TopBarEmployee from '../Layout/TopBarEmployee'
import { FaPrint } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FaRegFilePdf } from 'react-icons/fa6'
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const payslipData = {
    employee: {
        name: "Malick Barr",
        id: "EMP-101",
        designation: "Data Scientist",
        department: "Data Science",
        joiningDate: "12/03/2025",
        status: "Permanent",
    },
    earnings: [
        { label: "Basic Salary", amount: 73337 },
        { label: "House Allowance", amount: 0 },
        { label: "Utilities", amount: 8800 },
        { label: "Medical Expenses", amount: 11000 },
        { label: "Fuel Allowance", amount: 12850 },
    ],
    deductions: [
        { label: "EOBI", amount: 370 },
        { label: "Tax Adjustment", amount: 2500 },
        { label: "Employee PF Funds", amount: 6100 },
    ],
    contributions: {
        employeePF: 87250,
        employerPF: 87250,
    },
    leaves: {
        Sick: 6,
        Causal: 7.6,
        CPL: 0.79,
        Annual: 14,
    },
};

const Section = ({ title, children }) => (
    <div className="border border-[#F99932] my-4 bg-[#333334]">
        <div className="bg-[#F99932] text-black text-center font-bold py-1">
            {title}
        </div>
        <div className="text-white p-4">
            {children}
        </div>
    </div>
);


const Row = ({ label, amount }) => (
    <div className="flex justify-between py-1 border-b border-gray-600 last:border-none">
        <span>{label}</span>
        <span>Rs. {amount.toLocaleString()}</span>
    </div>
);





const EmployeePayroll = () => {
    const [month, setMonth] = useState(2); // March (0-indexed)
const [year, setYear] = useState(2025);

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const handlePrevMonth = () => {
    if (month === 0) {
        setMonth(11);
        setYear(year - 1);
    } else {
        setMonth(month - 1);
    }
};

const handleNextMonth = () => {
    if (month === 11) {
        setMonth(0);
        setYear(year + 1);
    } else {
        setMonth(month + 1);
    }
};

    const totalEarnings = payslipData.earnings.reduce((sum, e) => sum + e.amount, 0);
    const totalDeductions = payslipData.deductions.reduce((sum, d) => sum + d.amount, 0);
    return (

        <Layout>
            {/* Background Image */}
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10"
                style={{ backgroundImage: `url(${bgImg})` }}
            ></div>


            {/* Full Grid Layout */}
            <div className="grid grid-rows-[auto_1fr] min-h-screen w-full">
                <TopBarEmployee />
                {/* OtherContent */}

                <div className="w-full max-w-screen-xl mx-auto bg-[#333334] text-white p-6 font-sans">
                    <div className="flex flex-wrap justify-between items-center text-white font-semibold mb-4">
                        <div className="text-white">
                            <span className="text-white">PaySlip - </span>
                            <span className="bg-[#F99932]">
                                Month of {monthNames[month]} {year}
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button onClick={handlePrevMonth} className="text-white hover:text-orange-400">
                                <FaChevronLeft />
                            </button>
                            <span className="text-white font-bold">
                                {monthNames[month]} - {year}
                            </span>
                            <button onClick={handleNextMonth} className="text-white hover:text-orange-400">
                                <FaChevronRight />
                            </button>
                        </div>

                        <div className="flex gap-2 mt-2 sm:mt-0">
                            <button className="bg-[#F99932] px-4 py-1 rounded flex items-center gap-2 font-semibold text-black">
                                <FaPrint /> Print
                            </button>
                            <button className="bg-[#F99932] px-4 py-1 rounded flex items-center gap-2 font-semibold text-black">
                                <MdEmail /> Email
                            </button>
                            <button className="bg-[#F99932] px-4 py-1 rounded flex items-center gap-2 font-semibold text-black">
                                <FaRegFilePdf /> PDF
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 bg-[#333334] gap-3 my-4 text-sm flex justify-between items-center border border-orange-400 p-4 rounded w-full">
                        <div>Name - <span className="text-[#F99932]">Malick Barr</span></div>
                        <div>Employee ID - <span className="text-[#F99932]">EMP-101</span></div>
                        <div>Department - <span className="text-[#F99932]">Data Science</span></div>
                        <div>Joining Date - <span className="text-[#F99932]">12/03/2025</span></div>
                        <div>Designation - <span className="text-[#F99932]">Data Scientist</span></div>
                        <div>Employee Status - <span className="text-[#F99932]">Permanent</span></div>
                    </div>

                    <Section title="Earnings">
                        {payslipData.earnings.map((item, idx) => (
                            <Row key={idx} label={item.label} amount={item.amount} />
                        ))}
                        <div className="font-bold mt-2 border-t border-orange-400 pt-2 bg-[#333334]">
                            Total Earning: Rs. {totalEarnings.toLocaleString()}
                        </div>
                    </Section>

                    <Section title="Deductions">
                        {payslipData.deductions.map((item, idx) => (
                            <Row key={idx} label={item.label} amount={item.amount} />
                        ))}
                        <div className="font-bold mt-2 border-t border-orange-400 pt-2">
                            Total Deductions: Rs. {totalDeductions.toLocaleString()}
                        </div>
                    </Section>

                    <Section title="Total Contributions">
                        <Row label="Employee PF Contribution" amount={payslipData.contributions.employeePF} />
                        <Row label="Employer PF Contribution" amount={payslipData.contributions.employerPF} />
                    </Section>

                    <Section title="Leave Summary">
                        {Object.entries(payslipData.leaves).map(([key, val], idx) => (
                            <div key={idx} className="flex justify-between py-1 border-b border-gray-600 last:border-none">
                                <span>{key} Leaves</span>
                                <span>{val.toFixed(2)}</span>
                            </div>
                        ))}
                    </Section>
                </div>
            </div>


        </Layout>
    )
}

export default EmployeePayroll
