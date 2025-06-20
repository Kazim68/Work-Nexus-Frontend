// Modules.jsx
import React from "react";

const HrManagement = "https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Modules%20Icons/hr%20(3).png";
const PayrollGeneration = "https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Modules%20Icons/salary%20(1).png";
const EmployeeManagement = "https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Modules%20Icons/employee.png";
const AttendenceAndLeaveSystem = "https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Modules%20Icons/leave.png";
const ReportGeneration = "https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Modules%20Icons/hr%20(2).png";
const HelpDesk = "https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Modules%20Icons/help-desk.png";
const ModuleImg = "https://d194k6uxa928vc.cloudfront.net/assets/Landing%20Page%20Icons/Background%20Pics/66574.png";

import Navbar from "../Navbar";

const modules = [
  { id: 1, title: "HR Management", icon: HrManagement },
  { id: 2, title: "Payroll Generation", icon: PayrollGeneration },
  { id: 3, title: "Employee Management", icon: EmployeeManagement },
  { id: 4, title: "Attendence and Leave System", icon: AttendenceAndLeaveSystem },
  { id: 5, title: "Report Generation", icon: ReportGeneration },
  { id: 6, title: "Help Desk", icon: HelpDesk },
];

const ModuleCard = ({ title, icon, number }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-xl w-52 h-56 p-4 flex flex-col justify-between items-center shadow-md hover:shadow-orange-500/30 transition duration-300">
      <img src={icon} alt={title} className="h-10 mt-2" />
      <h2 className="text-white font-medium text-center text-sm">{title}</h2>
      <span className="text-gray-400 text-base font-medium">{number.toString().padStart(2, "0")}</span>
    </div>
  );
};

const Modules = () => {
  return (
    <div className="w-full min-h-screen relative">
      {/* Show on large screens only */}
      <div
              className="fixed inset-0 bg-cover bg-center z-[-1]"
              style={{
                backgroundImage: `url(${ModuleImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
              }}
            ></div>
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <div className="pt-32 px-2 h-full">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white">
                Smarter Tools, <span className="text-orange-500">for</span>
                <br /> Better <span className="text-orange-500">Outcomes.</span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-md">
                We're focused on making HR simpler for businesses while helping
                teams thrive with the best tools.
              </p>
            </div>

            <div className="md:w-1/2">
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                {modules.slice(0, 2).map((module) => (
                  <ModuleCard
                    key={module.id}
                    title={module.title}
                    icon={module.icon}
                    number={module.id}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-10 justify-center">
            {modules.slice(2).map((module) => (
              <ModuleCard
                key={module.id}
                title={module.title}
                icon={module.icon}
                number={module.id}
              />
            ))}
          </div>
        </div>

      {/* Show fallback message on small/medium screens */}
      <div className="block lg:hidden h-screen overflow-hidden flex items-center justify-center bg-black text-white text-center px-6">
        <p className="text-xl font-semibold">
          This page is only available on large screens. <br />
          Please switch to a desktop or expand your browser window.
        </p>
      </div>
    </div>
  );
};

export default Modules;