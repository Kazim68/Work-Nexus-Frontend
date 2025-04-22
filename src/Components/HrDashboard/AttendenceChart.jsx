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
    labels: Array.from({ length: 30 }, (_, i) => i + 1), // Days 1 to 30
    datasets: [
      {
        label: "Present",
        data: [1, 8, 5, 7, 6, 6, 7, 4, 1, 0, 1, 5, 5, 2, 0, 0, 7, 3, 0, 6, 0, 5, 4, 0, 8, 9, 8, 6, 7, 9],
        backgroundColor: "#28A745",
      },
      {
        label: "Absent",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 8, 0, 0, 0],
        backgroundColor: "#F44336",
      },
      {
        label: "Holidays",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 9],
        backgroundColor: "#FCD34D",
      },
      {
        label: "Off",
        data: [0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#9CA3AF",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "white",
          usePointStyle: true,
          padding: 20,
          boxWidth: 12,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
          color: "white",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "#444",
        },
      },
      y: {
        title: {
          display: true,
          text: "Hours",
          color: "white",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "#444",
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
    <span className="bg-orange-500 px-2 py-1 bg-[#F99932] rounded">EMP-101</span>
    <span className="bg-orange-500 px-2 py-1 bg-[#F99932] rounded">Muhammad Abdul Barr</span>
    <span className="bg-orange-500 px-2 py-1 bg-[#F99932] rounded">Senior Data Scientist</span>
    <span className="bg-orange-500 px-2 py-1 bg-[#F99932] rounded">Dept of Data Datascience</span>
  </div>

  {/* Dropdown */}
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
        <Bar data={currentMonthData} options={chartOptions} />
      </div>

      {/* Footer: Month */}
      <div className="mt-1/2 text-right text-sm font-semibold">
        Month: <span className="text-orange-500">March - 2025</span>
      </div>
    </div>
  );
};

export default AttendanceChart;
