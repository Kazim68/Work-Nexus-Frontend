import React from "react";
import Layout from "../../Layout/Layout";
import LeaveReport from "../ApplyLeave/LeaveReport";
import LeaveStats from "../LeaveDashboard/LeaveStats";
import LeaveRequests from "./LeaveRequest";
import { useEffect, useState } from "react";
import { getLeaveSummary } from '../../../Api/Employee/Leaves.js';

const LeaveStatus = () => {

  const [leaveSummary, setLeaveSummary] = useState(null);

  useEffect(() => { 
    const fetchLeaveSummary = async () => {
      try {
        const response = await getLeaveSummary();
        console.log(response);
        if (response?.success) {
          setLeaveSummary(response.leaveSummary);
        }
      } catch (error) {
        console.error("Error fetching leave summary:", error);
      }
    };

    fetchLeaveSummary();
  }, []);


  return (
    <Layout>
      <div className="text-xl font-semibold text-yellow-400 px-6 py-4">
        Leave / Leave Details
      </div>

      <div className="px-6 flex flex-col md:flex-row gap-6 items-stretch">
        <div className="w-full md:w-3/4 flex flex-col justify-between">
          <LeaveStats leaveSummary={leaveSummary} />
        </div>
        <div className="w-full md:w-1/4 flex flex-col justify-between">
          <LeaveRequests leaveSummary={leaveSummary} />
        </div>
      </div>

      <div className="px-6 mt-6">
        <h3 className="text-lg font-medium text-yellow-400 mb-2 text-left">
          Leave Report
        </h3>
        <div className="bg-[#] p-4 text-white">
          <LeaveReport />
        </div>
      </div>
    </Layout>
  );
};

export default LeaveStatus;