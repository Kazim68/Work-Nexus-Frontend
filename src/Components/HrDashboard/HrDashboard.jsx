import React from "react";
import Layout from "./Layout/Layout";
import bgImg from "../../assets/Landing Page Icons/Background Pics/HA21-04.png";
import TopBar from "./TopBar";
import GenderPiChart from "./GenderPiChart";
import TotalEmployees from "./TotalEmployee";
import ClockCards from "./ClockInOut";
import AttendenceChart from "./AttendenceChart";
import TicketRequests from "./TicketRequest";
import PayslipList from "./MonthlyPayslip";
import LeaveInfoCards from "./LeaveInfoCards";
import EmployeeAttendance from "./AttendenceLineChart";
import HRLeaveRequest from "./LeaveModule/HRLeaveRequest";

const HrDashboard = () => {
  return (
    <Layout>
      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>

      {/* Full Grid Layout */}
      <div className="grid grid-rows-[auto_1fr] min-h-screen w-full">
        {/* TopBar Row */}
        <TopBar />

        {/* Main Content Row */}
        <div className="flex flex-row w-full px-6 mt-4">
          {/* Left Panel - 30% width */}
          <div className="w-[30%] flex flex-col gap-4">
            <ClockCards />
            <div className="flex gap-4">
              <TotalEmployees />
              <GenderPiChart />
            </div>
            <div className="flex gap-4">
              <TicketRequests />
            </div>
            <PayslipList />
          </div>

          <div className="w-[70%] pl-6 flex flex-col gap-4">
            <AttendenceChart />
            <HRLeaveRequest />
            <div className="flex gap-4">
              {/* Left = Leave Info Cards (20%) */}
              <div className="w-[13%]">
                <LeaveInfoCards />
              </div>

              {/* Right = Attendance Chart (80%) */}
              <div className="w-[87%]">
                <EmployeeAttendance />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HrDashboard;
