import React from "react";
import LeaveForm from "./LeaveForm";
import Calendar from "./Calendar";
import Layout from "../../Components/Sidebar/Layout";
import LeaveReport from "./LeaveReport";
import LeaveSummary from "./LeaveSummary";

const Dashboard = () => {
  return (
    <Layout>
      {/* Small & Medium Screens: Custom Order */}
      <div className="flex flex-col gap-6 md:hidden">
        <Calendar />
        <LeaveForm />
        <LeaveReport />
        <LeaveSummary />
      </div>

      {/* Large Screens: Default Grid Layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-12">
        <div className="w-full md:col-span-2">
          <div><LeaveForm /></div>
          <div className="mt-4">
            <LeaveReport />
          </div>
        </div>

        <div className="w-full">
          <div><Calendar /></div>
          <div className="mt-4"><LeaveSummary /></div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
