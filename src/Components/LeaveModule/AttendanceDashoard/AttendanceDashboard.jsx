import { useQuery } from "@tanstack/react-query";
import Layout from "../../Layout/Layout";
import AttendanceSummary from "./AttendanceSummary";
import MonthlyAttendanceInfo from "./MonthlyAttendanceInfo";
import StatsCards from "./StatsCards";
import { fetchOne } from "../../../Api/Api";
import Loader from "../../Shared/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const { data } = useSelector((state) => state.user);
    const employeeId = data.employee._id;
    const workingHoursString = data.employee.companyID.workTimings?.[0]; // e.g., '09:00 - 17:00'
    console.log(data)
    

    //Fetching attendance data
    const { data: attendanceData, error, isLoading } = useQuery({
        queryKey: ['get_data', employeeId],
        queryFn: () => fetchOne('/attendance/summary', employeeId, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            }
        }),
        enabled: !!employeeId,
        staleTime: 0,
        cacheTime: 0,
    });

    //fetching raised tokens data
    const { data: tokenData, error: tokenError, isLoading: tokenLoading } = useQuery({
        queryKey: ['get_tokens', employeeId],
        queryFn: () => fetchOne('/token/getTokens', employeeId, {
            headers: {
                Authorization: `Bearer ${data.token}`,
            }
        }),
        enabled: !!employeeId,
        staleTime: 0,
        cacheTime: 0,
    });

    if (isLoading || tokenLoading) return (
        <div className="flex items-center justify-center h-screen">
            <Loader />
        </div>
    );

    if (error || tokenLoading) toast.error(error || tokenLoading);

    //calculating daily work hours for stats cards
    const calculateDailyWorkingHours = (timeRange) => {
        if (!timeRange) return 0;
        const [start, end] = timeRange.split(" - ");
        const [startHour, startMin] = start.split(":").map(Number);
        const [endHour, endMin] = end.split(":").map(Number);

        const startTime = startHour + startMin / 60;
        const endTime = endHour + endMin / 60;

        return (endTime - startTime).toFixed(2);
    };

    const dailyWorkingHours = parseFloat(calculateDailyWorkingHours(workingHoursString));

    //Calculating total monthly hours worked for stats card
    const getTotalMonthlyHours = (currentMonthData) => {
        if (!currentMonthData || typeof currentMonthData !== 'object') return 0;
        return Object.values(currentMonthData)
            .reduce((total, hours) => total + hours, 0)
            .toFixed(2);
    };

    //Getting day name for data grid
    const getDayName = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    };

    //formating date for data grid
    const formatDate = (day, monthOffset = 0) => {
        const now = new Date();
        const date = new Date(now.getFullYear(), now.getMonth() + monthOffset, day);
        return date.toLocaleDateString();
    };

    //extracting rows for data grid
    const extractRows = (monthDetails, monthHours, monthOffset = 0) => {
        const nullClockOutDays = [];
        const today = new Date();
        const currentDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, today.getDate()).toLocaleDateString();

        const rows = Object.entries(monthDetails)
            .map(([day, details]) => {
                const dateStr = formatDate(Number(day), monthOffset);

                // 🚫 Skip current date
                if (dateStr === currentDate) return null;

                // Check and track missing clockOut (excluding today)
                if (!details.clockOutTime) {
                    nullClockOutDays.push(dateStr);
                }

                const clockIn = new Date(details.clockInTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                const clockOut = details.clockOutTime
                    ? new Date(details.clockOutTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    : "Missing";

                const workingHour = monthHours[day] ?? 0;
                const overtime = Math.max(0, (workingHour - dailyWorkingHours)).toFixed(2);

                return {
                    Date: dateStr,
                    Day: getDayName(dateStr),
                    ClockIn: clockIn,
                    ClockOut: clockOut,
                    WorkingHour: workingHour.toFixed(2),
                    OverTime: overtime,
                };
            })
            .filter(Boolean); // Remove nulls from skipped rows

        return { rows, nullClockOutDays };
    };


    const { rows: currentMonthRows, nullClockOutDays: currentMonthNulls } = extractRows(
        attendanceData.currentMonthDetails || {},
        attendanceData.currentMonth || {},
        0
    );

    const { rows: previousMonthRows, nullClockOutDays: previousMonthNulls } = extractRows(
        attendanceData.previousMonthDetails || {},
        attendanceData.previousMonth || {},
        -1
    );

    //Checking misseed clockouts
    const hasMissingClockOut = [...currentMonthNulls, ...previousMonthNulls];

    //Overtime calculation
    const totalOvertime = currentMonthRows.reduce(
        (acc, row) => acc + parseFloat(row.OverTime || 0),
        0
    );

    const currentMonthData = attendanceData?.currentMonth;
    const actualTotalHours = parseFloat(getTotalMonthlyHours(currentMonthData));

    const tokensArray = tokenData?.tokensData || []; // Adjust this based on your actual API response shape

    // Step 2: Format token raised dates to match `hasMissingClockOut` format
    const tokenDatesForAttendance = tokensArray
        .filter(token => token.IssueType === 'Attendance')
        .map(token => {
            console.log
            const date = new Date(token.IssueDate);
            return date.toLocaleDateString(); // e.g., "4/10/2025"
        });

    // Step 3: Filter out any missing clock-out dates that already have tokens
    const unresolvedMissingClockOuts = hasMissingClockOut.filter(
        date => !tokenDatesForAttendance.includes(date)
    );



    return (
        <Layout>
            <div className="p-4 max-w-screen-xl mx-auto">

                {/* ⚠️ Warning for null clock out entries */}
                {unresolvedMissingClockOuts.length > 0 && (
                    <div className="bg-yellow-100 border border-yellow-500 text-yellow-800 px-4 py-3 rounded mb-4">
                        <strong className="font-bold">Warning:</strong>
                        <span className="ml-2">
                            There are {unresolvedMissingClockOuts.length} attendance entries with missing clock-out times. <Link to='/dashboard' className="underline">Raise Token?</Link>
                        </span>
                    </div>
                )}

                {/* Grid Layout for Chart & Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch">
                    <div className="lg:col-span-2">
                        <div className="border border-amber-600 shadow-lg rounded-lg p-4 w-full min-h-[400px] flex">
                            <MonthlyAttendanceInfo thisMonthData={currentMonthData} previousMonthData={attendanceData?.previousMonth} />
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col w-full min-h-[400px]">
                        <StatsCards
                            todayData={attendanceData?.today}
                            totalHours={actualTotalHours}
                            overtime={totalOvertime}
                        />
                    </div>
                </div>

                <div className="lg:hidden mt-4">
                    <StatsCards
                        todayData={attendanceData?.today}
                        totalHours={actualTotalHours}
                        overtime={totalOvertime}
                    />
                </div>

                <div className="mt-4 w-full border border-amber-600 rounded-lg">
                    <AttendanceSummary
                        cuurentMonthRows={currentMonthRows}
                        previousMonthRows={previousMonthRows}
                        workTimings={dailyWorkingHours}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
