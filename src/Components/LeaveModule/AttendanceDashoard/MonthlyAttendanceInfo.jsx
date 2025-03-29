import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyAttendanceInfo = () => {
  const data = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1), // Days 1-30
    datasets: [
      { label: "Present", data: [10, 12, 9, 8, 10, 15, 14, 13, 16, 10, 9, 12, 8, 10, 15, 14, 13, 16, 10, 9, 12, 8, 10, 15, 14, 13, 16, 10, 9, 12], backgroundColor: "#A0E7A0" },
      { label: "Absent", data: [2, 1, 3, 2, 2, 5, 4, 3, 2, 1, 3, 2, 2, 5, 4, 3, 2, 1, 3, 2, 2, 5, 4, 3, 2, 1, 3, 2, 2, 5], backgroundColor: "#FF6B6B" },
      { label: "Holidays", data: [1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0], backgroundColor: "#FFD166" },
      { label: "Off", data: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], backgroundColor: "#A0A0A0" }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures it stretches properly
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Bar data={data} options={options} className="h-full w-full" />
    </div>
  );
};

export default MonthlyAttendanceInfo;
