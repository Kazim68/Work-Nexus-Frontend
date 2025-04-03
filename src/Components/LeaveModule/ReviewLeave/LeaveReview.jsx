import React from "react";
import Layout from "../../Layout/Layout";
import LeaveReport from "../ApplyLeave/LeaveReport";
import LeaveStats from "../LeaveDashboard/LeaveStats";
import LeaveRequests from "./LeaveRequest";

const LeaveStatus = () => {
  return (
    <Layout>
      <div className="text-xl font-semibold text-gray-700 px-6 py-4">
        Leave / Leave Details
      </div>

      <div className="px-6 flex flex-col md:flex-row gap-6 items-stretch">
        <div className="w-full md:w-3/4 flex flex-col justify-between">
          <LeaveStats />
        </div>
        <div className="w-full md:w-1/4 flex flex-col justify-between">
          <LeaveRequests />
        </div>
      </div>

      <div className="px-6 mt-6">
        <h3 className="text-lg font-medium text-gray-600 mb-2 text-left">
          Leave Report
        </h3>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <LeaveReport />
        </div>
      </div>
    </Layout>
  );
};

export default LeaveStatus;