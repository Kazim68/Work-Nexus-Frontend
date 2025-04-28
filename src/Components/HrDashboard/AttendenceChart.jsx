import React, { useState, useMemo, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchOne } from "../../Api/Api";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MAX_DAYS_IN_MONTH = 31;
const DEFAULT_ABSENT_HOURS = 8;

const AttendanceChart = ({ employees }) => {
  const [selectedMonth, setSelectedMonth] = useState("current");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  

  const { data } = useSelector((state) => state.user); // Access user data from Redux

  const [employeeId, setEmployeeId] = useState(data.employee._id); // State for employeeId

  const currentDate = new Date();
  const currentDay = currentDate.getDate(); // Get today's day (1-31)
  const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // Get last day of the previous month

  // Use the employeeId to make the query dynamic
  const { data: attendanceData, error, isLoading } = useQuery({
    queryKey: ['get_attendance', employeeId],
    queryFn: () => fetchOne('/attendance/summary', employeeId, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      }
    }),
    enabled: !!employeeId, // Only make the query when employeeId is available
    staleTime: 0,
    cacheTime: 0,
  });

  const handleEmployeeChange = (e) => {
    const selectedEmployeeId = e.target.value;
    setSelectedEmployee(selectedEmployeeId);
    setEmployeeId(selectedEmployeeId); // Update the employeeId state to fetch new data
  };

  const rawData = selectedMonth === "current" ? attendanceData?.currentMonth : attendanceData?.previousMonth;

  // Normalize data to 1-31 days with absent fallback
  const normalizedData = useMemo(() => {
    if (!rawData) return []; // Handle case where rawData is not available yet

    const daysArray = Array.from({ length: selectedMonth === "current" ? currentDay : daysInPreviousMonth }, (_, i) => {
      const day = (i + 1).toString();
      const value = rawData[day];
      const workedHours = value || 0;
      const absentHours = workedHours < DEFAULT_ABSENT_HOURS ? DEFAULT_ABSENT_HOURS - workedHours : 0;

      return {
        day: i + 1,
        present: workedHours,
        absent: absentHours,
      };
    });

    return daysArray;
  }, [rawData, currentDay, daysInPreviousMonth, selectedMonth]);

  const chartData = {
    labels: normalizedData.map((d) => d.day),
    datasets: [
      {
        label: "Present (hrs)",
        data: normalizedData.map((d) => d.present),
        backgroundColor: "#A0E7A0", // Green for present
      },
      {
        label: "Absent (hrs)",
        data: normalizedData.map((d) => d.absent),
        backgroundColor: "#FF6B6B", // Red for absent
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      y: {
        suggestedMax: 10,
        title: {
          display: true,
          text: "Hours",
        },
      },
    },
  };

  return (
    <div className="bg-[#1f1f1f] text-white border border-[#F99932] rounded-md p-4 h-[420px] w-[800px]">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        {/* Employee Info */}
        <div className="flex flex-wrap gap-1 items-center text-[11px]">
          <span className="font-semibold text-white">Employee Search:</span>
          <select
            value={selectedEmployee}
            onChange={handleEmployeeChange}
            className="p-1 rounded border border-[#F99932] bg-[#212020] text-orange-500 text-[12px]"
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName} ({employee.employeeCode})
              </option>
            ))}
          </select>
        </div>

        {/* Month Dropdown */}
        <div className="flex items-center gap-1 text-[11px]">
          <span className="font-medium text-white">View By:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-1 rounded border border-[#F99932] bg-[#212020] text-orange-500 text-[12px]"
          >
            <option value="current">This Month</option>
            <option value="previous">Previous Month</option>
          </select>
        </div>
      </div>

      {/* Chart Area */}
      <div className="h-[300px]">
        {isLoading ? (
          <div className="text-center text-white">Loading data...</div>
        ) : error ? (
          <div className="text-center text-white">Error fetching data.</div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>

      {/* Footer: Month */}
      <div className="mt-1/2 text-right text-sm font-semibold">
        Month: <span className="text-orange-500">
          {selectedMonth === "current"
            ? `${currentDate.toLocaleString("default", { month: "long" })} - ${currentDate.getFullYear()}`
            : new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1).toLocaleString("default", { month: "long" }) + " - " + (currentDate.getFullYear())}
        </span>
      </div>

    </div>
  );
};

export default AttendanceChart;
