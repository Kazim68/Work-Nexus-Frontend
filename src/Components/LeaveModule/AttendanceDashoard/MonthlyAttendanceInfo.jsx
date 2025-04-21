import { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MAX_DAYS_IN_MONTH = 31; // Max days in a month
const DEFAULT_ABSENT_HOURS = 8;

const MonthlyAttendanceInfo = ({ thisMonthData = {}, previousMonth = {} }) => {
  const [selectedMonth, setSelectedMonth] = useState("current");

  const currentDate = new Date();
  const currentDay = currentDate.getDate(); // Get today's day (1-31)
  
  const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // Get last day of the previous month

  const rawData = selectedMonth === "current" ? thisMonthData : previousMonth;

  // Normalize data to 1-31 days with absent fallback
  const normalizedData = useMemo(() => {
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
        backgroundColor: "#A0E7A0",
      },
      {
        label: "Absent (hrs)",
        data: normalizedData.map((d) => d.absent),
        backgroundColor: "#FF6B6B",
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
          text: 'Hours',
        },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <div className="flex justify-end mb-2">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 rounded-lg border border-amber-600 text-sm bg-[#212020] text-amber-600 focus:outline-none focus:ring focus:ring-amber-600"
        >
          <option value="current">This Month</option>
          <option value="previous">Previous Month</option>
        </select>
      </div>

      <div className="h-[300px] w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyAttendanceInfo;
