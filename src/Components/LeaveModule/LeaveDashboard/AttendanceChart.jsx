import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const AttendanceChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("current");

  const currentMonthData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Present",
        data: [7, 6, 7, 0, 6, 8, 8],
        backgroundColor: "lightgreen",
      },
      {
        label: "Absent",
        data: [0, 0, 0, 8, 0, 0, 0],
        backgroundColor: "red",
      },
      {
        label: "Off",
        data: [0, 0, 0, 0, 0, 0, 8],
        backgroundColor: "gray",
      },
    ],
  };

  const previousMonthData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Present",
        data: [6, 7, 7, 6, 6, 6, 7],
        backgroundColor: "lightgreen",
      },
      {
        label: "Absent",
        data: [0, 0, 0, 2, 1, 1, 0],
        backgroundColor: "red",
      },
      {
        label: "Off",
        data: [2, 0, 0, 0, 1, 1, 1],
        backgroundColor: "gray",
      },
    ],
  };

  const chartData = selectedMonth === "current" ? currentMonthData : previousMonthData;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#D97706", // Tailwind's amber-600
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#D97706" },
      },
      y: {
        ticks: { color: "#D97706" },
      },
    },
  };

  return (
    <div className="h-full flex flex-col border-amber-600">
      {/* Dropdown for selecting month */}
      <div className="mb-4 flex justify-end items-center gap-2">
  <span className="text-sm font-medium text-amber-600">Select Month</span>
  <select
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(e.target.value)}
    className="p-2 rounded-lg border border-amber-600 text-sm bg-[#212020] text-amber-600 focus:outline-none focus:ring focus:ring-amber-600"
  >
    <option value="current">This Month</option>
    <option value="previous">Previous Month</option>
  </select>
</div>


      {/* Chart container */}
      <div className="flex-1 min-h-[250px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AttendanceChart;
