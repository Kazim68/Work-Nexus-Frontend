import React from "react";
import Layout from "../../Layout/Layout";
import Calendar from "../../Shared/Calendar";
import LeaveReport from "../ApplyLeave/LeaveReport";
import LeaveSummary from "../ApplyLeave/LeaveSummary";

const LeaveStatus = () => {
  return (
    <Layout>
      {/* Small & Medium Screens: Custom Order */}
      <div className="flex flex-col gap-6 md:hidden">
        <LeaveReport />
        <LeaveSummary />
      </div>

      {/* Large Screens: Default Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-12">
        <div className="w-full md:col-span-2">
          <div><LeaveReport /></div>
        </div>

        <div className="w-full">
          <div><Calendar /></div>
          <div className="mt-4"><LeaveSummary /></div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaveStatus;
