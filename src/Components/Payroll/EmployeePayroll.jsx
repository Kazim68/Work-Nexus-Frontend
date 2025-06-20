import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
const bgImg = 'https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Background%20Pics/2052-3-1.jpg'
import { FaPrint } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { FaRegFilePdf } from 'react-icons/fa6'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getPayroll } from '../../Api/Employee/Payroll'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


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
    const { employeeId, year, month } = useParams();
    const numericYear = parseInt(year);
    const numericMonth = parseInt(month) - 1;
    const [payslip, setPayslip] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(parseInt(month));
    const [selectedYear, setSelectedYear] = useState(parseInt(year));
    const { data } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);



    useEffect(() => {
        const fetchPayroll = async () => {
            try {
                if (!employeeId || !year || !month) { 
                    toast.error('Invalid parameters provided for fetching payroll.');
                    navigate('/dashboard')
                    return;
                }
                setLoading(true);
                const paddedMonth = month.toString().padStart(2, '0');
                const response = await getPayroll(employeeId, year, paddedMonth);
                if (!response.success) {
                    if (response.message == 'Payroll record not found') {
                        setNotFound(true);
                        setPayslip(null);
                    }
                    console.error('Error fetching payrolls:', response.message);
                    return;
                }
                setNotFound(false);
                setPayslip(response.payroll);
                console.log(payslip)
            } catch (error) {
                console.error('Error fetching payrolls:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayroll();
    }, [year, month])

    useEffect(() => {
        if (parseInt(month) !== selectedMonth || parseInt(year) !== selectedYear) {
            navigate(`/payslip/${employeeId}/${selectedYear}/${selectedMonth}`);
        }
    }, [selectedMonth, selectedYear, employeeId, month, year]);


    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handlePrevMonth = () => {
        const minYear = 2025;
        const minMonth = 0; // January
    
        const isAtMinimum = selectedYear === minYear && selectedMonth === minMonth;
        if (isAtMinimum) return;
    
        if (selectedMonth === 0) {
            setSelectedMonth(11);
            setSelectedYear(prev => prev - 1);
        } else {
            setSelectedMonth(prev => prev - 1);
        }
    };
    

    const handleNextMonth = () => {
        const today = new Date();
        const currentMonth = today.getMonth(); // 0-based
        const currentYear = today.getFullYear();
    
        const isCurrentMonthAndYear = selectedYear === currentYear && selectedMonth === currentMonth;
    
        if (isCurrentMonthAndYear) return; // Don't allow moving to future
    
        if (selectedMonth === 11) {
            setSelectedMonth(0);
            setSelectedYear(prev => prev + 1);
        } else {
            setSelectedMonth(prev => prev + 1);
        }
    };
    


    const totalEarnings = payslip?.Allowances
        ? Object.values(payslip.Allowances).reduce((sum, val) => sum + val, 0)
        : 0;

    const totalDeductions = payslip?.Deductions
        ? Object.values(payslip.Deductions).reduce((sum, val) => sum + val, 0)
        : 0;


    if (loading) {
        return <Layout><div className="text-white p-10">Loading payslip...</div></Layout>;
    }
    
    if (notFound) {
        return <Layout><div className="text-orange-400 p-10">Payroll not generated yet for this month.</div></Layout>;
    }
    

    return (

        <Layout>
            {/* Background Image */}
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10"
                style={{ backgroundImage: `url(${bgImg})` }}
            ></div>


            {/* Full Grid Layout */}
            <div className="grid grid-rows-[auto_1fr] min-h-screen w-full">
                {/* OtherContent */}

                <div className="w-full max-w-screen-xl mx-auto bg-[#333334] text-white p-6 font-sans">
                    <div className="flex flex-wrap justify-between items-center text-white font-semibold mb-4">
                        <div className="text-white">
                            <span className="text-white">PaySlip - </span>
                            <span className="bg-[#F99932]">
                                Month of {monthNames[numericMonth]} {year}
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button onClick={handlePrevMonth} className="text-white hover:text-orange-400">
                                <FaChevronLeft />
                            </button>
                            <span className="text-white font-bold">
                                {monthNames[numericMonth]} - {year}
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
                        <div>Name - <span className="text-[#F99932]">{data?.employee?.firstName} {data?.employee?.lastName}</span></div>
                        <div>Employee ID - <span className="text-[#F99932]">{data?.employee?.employeeCode || "N/A"}</span></div>
                        <div>Department - <span className="text-[#F99932]">{data?.employee?.department || "N/A"}</span></div>
                        <div>Joining Date - <span className="text-[#F99932]">{Date(data?.employee?.hireDate) || "N/A"}</span></div>
                        <div>Designation - <span className="text-[#F99932]">{data?.employee?.position || "N/A"}</span></div>
                    </div>

                    <Section title="Earnings">
                        {payslip?.Allowances &&
                            Object.entries(payslip.Allowances)
                                .filter(([label, _]) => label !== "OvertimeHours") // Exclude OvertimeHours
                                .map(([label, amount], idx) => (
                                    <Row key={idx} label={label} amount={amount} />
                                ))
                        }
                        <div className="font-bold mt-2 border-t border-orange-400 pt-2 bg-[#333334]">
                            Total Earning: Rs. {totalEarnings.toLocaleString()}
                        </div>
                    </Section>



                    <Section title="Deductions">
                        {payslip?.Deductions &&
                            Object.entries(payslip.Deductions)
                                .filter(([label, _]) => label !== "Absents")
                                .map(([label, amount], idx) => (
                                    <Row key={idx} label={label} amount={amount} />
                                ))
                        }
                        <div className="font-bold mt-2 border-t border-orange-400 pt-2">
                            Total Deductions: Rs. {totalDeductions.toLocaleString()}
                        </div>
                    </Section>


                    <Section title="Total Contributions">
                        <Row label="Employee PF Contribution" amount={payslip?.Contributions?.EmployeePF_Fund} />
                        <Row label="Employer PF Contribution" amount={payslip?.Contributions?.EmployerPF_Fund} />
                    </Section>

                    <Section title="Leave Summary">
                        {Object.entries(payslip?.Leaves).map(([key, val], idx) => (
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