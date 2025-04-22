import React from "react";
import { Pie } from "react-chartjs-2";
import { FaMale, FaFemale } from "react-icons/fa";
import "chart.js/auto";

const GenderPiChart = () => {
    const data = {
        labels: ["Male", "Female"],
        datasets: [
            {
                data: [65, 35],
                backgroundColor: ["#FF8C00", "#FFFFFF"],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        cutout: "70%",
        maintainAspectRatio: false,
    };

    return (
        <div className="bg-[#333334] text-white rounded-md p-6 border border-[#F99932] w-[230px] h-[300px] flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-white text-center mb-4">Gender Ratio</h2>
            <div className="relative w-full h-[150px] mx-auto">
                <Pie data={data} options={options} />
                {/* Female Tag */}
                <div className="absolute top-[20%] left-0 flex items-center bg-gray-100 rounded-full px-3 py-2 shadow">
                    <FaFemale className="text-black text-lg mr-2" />
                    <span className="text-black text-sm font-bold">35%</span>
                </div>
                {/* Male Tag */}
                <div className="absolute bottom-[15%] right-0 flex items-center bg-gray-800 rounded-full px-3 py-2 shadow border border-gray-400">
                    <FaMale className="text-orange-400 text-lg mr-2" />
                    <span className="text-orange-400 text-sm font-bold">65%</span>
                </div>
            </div>
        </div>
    );
};

export default GenderPiChart;
