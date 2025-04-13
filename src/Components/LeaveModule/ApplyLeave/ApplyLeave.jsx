import React from "react";
import LeaveForm from "./LeaveForm";
import Calendar from "../../Shared/Calendar";
import Layout from "../../Layout/Layout";
import LeaveSummary from "./LeaveSummary";

const Dashboard = () => {
  return (
    <Layout>
      {/* Small & Medium Screens: Custom Order */}
      <div className="flex flex-col gap-6 md:hidden">
        <LeaveForm />
        <LeaveSummary />
      </div>

      <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-12">
        <div className="w-full md:col-span-2">
          <div><LeaveForm /></div>
        </div>

        <div className="w-full">
          <div><Calendar  width = "w-80" height = "h-[280px]" ch= "h-6"/></div>
          <div className="mt-4"><LeaveSummary /></div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;