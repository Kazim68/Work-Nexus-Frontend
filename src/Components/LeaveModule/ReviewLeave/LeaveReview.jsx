import Sidebar from "../../Layout/Sidebar";
import Navbar from "../../Layout/Navbar";
import Calendar from "../ApplyLeave/Calendar";
import LeaveReport from "../ApplyLeave/LeaveReport";
import LeaveSummary from "../ApplyLeave/LeaveSummary";

export default function LeaveReview() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex flex-1 flex-col p-6">
          <h2 className="text-xl font-semibold text-gray-700">Leave / Leave Review</h2>
          
          {/* Leave Report Section */}
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-600 mb-2">Leave Report</h3>
            <LeaveReport />
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="w-1/4 p-4">
          <Calendar />
          <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-600 mb-2">Leave Summary</h3>
            <LeaveSummary />
          </div>
        </div>
      </div>
    </div>
  );
}