import React from "react";
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
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader";
import { fetchOne } from "../../Api/Api";
import Layout from "../Layout/Layout";
import HRLeaveRequest from "./LeaveModule/HRLeaveRequest";

const HrDashboard = () => {

  const { data } = useSelector((state) => state.user);
  const employeeId = data.employee._id;

  const companyId = data.employee.companyID._id

  const workingHoursString = data.employee.companyID.workTimings?.[0]; // e.g., '09:00 - 17:00'


  const getworkingtime= (timeRange) => {
    if (!timeRange) return 0;
    const [start, end] = timeRange.split(" - ");
    return [start,end];
  };

  //Fetching attendance data
  const { data: employeeData, error: employeeError, isLoading: employeeLoading } = useQuery({
    queryKey: ['get_employee', companyId],
    queryFn: () => fetchOne('/company/getEmployees', companyId, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      }
    }),
    enabled: !!employeeId,
    staleTime: 0,
    cacheTime: 0,
  });

  // Fetching data using React Query
  const { data: tokens, isLoading: tokensLoading, error: tokensError } = useQuery({
    queryKey: ["get_all_tokens"],
    queryFn: () =>
      fetchOne("/token/getAllTokens", companyId, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    staleTime: 0,
    cacheTime: 0,
  });


  if (employeeLoading || tokensLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  const getEmployeeCounts = (employees) => {
    if (!Array.isArray(employees)) {
      console.error("The input data is not an array.");
      return { totalEmployees: 0, genderCounts: { male: 0, female: 0 } };
    }

    const totalEmployees = employees.length; // Total count of employees
    const genderCounts = { male: 0, female: 0 };

    // Loop through employees to count genders
    employees.forEach((employee) => {
      if (employee.gender === true) {
        genderCounts.male += 1;
      } else if (employee.gender === false) {
        genderCounts.female += 1;
      }
    });

    return {
      totalEmployees,
      genderCounts,
    };
  };



  const { totalEmployees, genderCounts } = getEmployeeCounts(employeeData.employees);

  const males = (genderCounts.male / totalEmployees) * 100
  const females = (genderCounts.female / totalEmployees) * 100

  const currentTimings = getworkingtime(workingHoursString)
  


  return (
    <Layout>
  <div className="min-h-screen w-full flex flex-col px-6 py-4 gap-6"> {/* ✅ px-6 applied once */}

    {/* Main Content (Left and Right Panels) */}
    <div className="flex flex-row w-full gap-6">
      {/* Left Panel - 30% */}
      <div className="w-[30%] flex flex-col gap-4">
        <ClockCards times={currentTimings}/>
        <div className="flex gap-4">
          <TotalEmployees count={totalEmployees} />
          <GenderPiChart gender={genderCounts} males={males} females={females} />
        </div>
        <TicketRequests tickets={tokens.tokens} />
      </div>

          {/* Right Panel - 70% */}
      <div className="w-[80%] flex flex-col gap-4">
        <AttendenceChart employees={employeeData.employees} />
        <HRLeaveRequest />
      </div>
    </div>

    {/* Full Width Employee Attendance */}
    <div className="w-full">
      <EmployeeAttendance employees={employeeData.employees} />
    </div>

  </div>
</Layout>

  );
  
};

export default HrDashboard;
