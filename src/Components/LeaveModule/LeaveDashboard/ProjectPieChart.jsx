import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["P1", "P2", "P3", "P4", "P5"],
  datasets: [
    {
      label: "Projects",
      data: [20, 15, 25, 20, 20],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FFA500", "#4CAF50"],
      hoverOffset: 4,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const ProjectPieChart = () => {
  return <Pie data={data} options={options} />;
};

export default ProjectPieChart;
