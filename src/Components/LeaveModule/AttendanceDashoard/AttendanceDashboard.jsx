import Layout from "../../Layout/Layout";
import AttendanceSummary from "./AttendanceSummary";
import MonthlyAttendanceInfo from "./MonthlyAttendanceInfo";
import StatsCards from "./StatsCards";

const Dashboard = () => {
    return (
        <Layout>
            <div className="p-4 max-w-screen-xl mx-auto">
                {/* Grid Layout for Chart & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
                    
                    {/* Attendance Chart */}
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow-lg rounded-lg p-4 w-full min-h-[400px] flex">
                            <MonthlyAttendanceInfo />
                        </div>
                    </div>

                    {/* Stats Cards (Visible on Large Screens) */}
                    <div className="hidden lg:flex flex-col w-full min-h-[400px]">
                        <StatsCards />
                    </div>
                </div>

                {/* Stats Cards (Visible on Smaller Screens) */}
                <div className="lg:hidden mt-4">
                    <StatsCards />
                </div>

                {/* Attendance Summary Table */}
                <div className="mt-4 w-full">
                    <AttendanceSummary />
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
