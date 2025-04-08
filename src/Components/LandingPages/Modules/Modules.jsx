// Modules.jsx
import React from "react";

import HrManagement from "../../../assets/Landing Page Icons/Modules Icons/hr (3).png";
import PayrollGeneration from "../../../assets/Landing Page Icons/Modules Icons/salary (1).png";
import EmployeeManagement from "../../../assets/Landing Page Icons/Modules Icons/employee.png";
import AttendenceAndLeaveSystem from "../../../assets/Landing Page Icons/Modules Icons/leave.png";
import ReportGeneration from "../../../assets/Landing Page Icons/Modules Icons/hr (2).png";
import HelpDesk from "../../../assets/Landing Page Icons/Modules Icons/help-desk.png";
import ModuleImg from "../../../assets/Landing Page Icons/Background Pics/66574.png";

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
    <div className="bg-[#1a1a1a] rounded-xl w-64 h-64 p-6 flex flex-col justify-between items-center shadow-md hover:shadow-orange-500/30 transition duration-300">
      <img src={icon} alt={title} className="h-12 mt-2" />
      <h2 className="text-white font-semibold text-center text-base">{title}</h2>
      <span className="text-gray-400 text-lg font-medium">{number.toString().padStart(2, "0")}</span>
    </div>
  );
};

const Modules = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white px-6 py-12"
      style={{ backgroundImage: `url(${ModuleImg})` }}
    >
      <Navbar/>
      <div className="flex flex-col md:flex-row justify-between items-start gap-12 mt-30">
        {/* Left Section */}
        <div className="flex-1 mb-10 md:mb-0 ml-45">
          <h1 className="text-6xl font-bold mb-4">
            Smarter Tools, <span className="text-orange-500">for</span>
            <br /> Better <span className="text-orange-500">Outcomes.</span>
          </h1>
          <p className="text-gray-400 max-w-md">
            We're focused on making HR simpler for businesses while helping
            teams thrive with the best tools.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 mr-40">
          <div className="flex flex-wrap gap-6 justify-center md:justify-end">
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


      <div className="flex flex-wrap gap-6 mt-6 justify-center ml-16">
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

  );
};

export default Modules;