import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AttendanceChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      { label: "Present", data: [7, 6, 7, 0, 6, 8, 8], backgroundColor: "lightgreen" },
      { label: "Absent", data: [0, 0, 0, 8, 0, 0, 0], backgroundColor: "red" },
      { label: "Off", data: [0, 0, 0, 0, 0, 0, 8], backgroundColor: "gray" },
    ],
  };

  return <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />;
};

export default AttendanceChart