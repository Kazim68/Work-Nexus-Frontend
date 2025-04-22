import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        week: "First Week",
        scheduled: 21,
        worked: 13.85,
        average: 4.62,
        scheduledLabel: "21:00:00",
        workedLabel: "13:51:29",
        averageLabel: "04:37:10",
    },
    {
        week: "Second Week",
        scheduled: 27,
        worked: 17.8,
        average: 5.94,
        scheduledLabel: "27:00:00",
        workedLabel: "17:48:07",
        averageLabel: "05:56:02",
    },
    {
        week: "Third Week",
        scheduled: 45,
        worked: 0,
        average: 0,
        scheduledLabel: "45:00:00",
        workedLabel: "00:00:00",
        averageLabel: "00:00:00",
    },
    {
        week: "Fourth Week",
        scheduled: 45,
        worked: 0,
        average: 0,
        scheduledLabel: "45:00:00",
        workedLabel: "00:00:00",
        averageLabel: "00:00:00",
    },
    {
        week: "Fifth Week",
        scheduled: 45,
        worked: 0,
        average: 0,
        scheduledLabel: "45:00:00",
        workedLabel: "00:00:00",
        averageLabel: "00:00:00",
    },
];

const EmployeeAttendance = () => {
    return (
        <div className="p-3 bg-white rounded-lg shadow-md max-w-2xl text-xs">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-sm font-semibold text-blue-900 flex items-center gap-2">
                    📈 EMPLOYEE ATTENDANCE VISUALIZATION
                </h2>
                <div className="flex items-center gap-2">
                    <span className="font-medium">Search:</span>
                    <input
                        type="text"
                        value="EMP-101"
                        readOnly
                        className="bg-orange-400 text-white font-bold px-2 py-1 rounded text-xs"
                    />
                </div>
            </div>

            <ResponsiveContainer width="100%" height={180}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" tick={{ fontSize: 9 }} />
                    <YAxis
                        label={{
                            value: "Hours",
                            angle: -90,
                            position: "insideLeft",
                            offset: 5,
                            fontSize: 9,
                        }}
                        domain={[0, 50]}
                        tick={{ fontSize: 9 }}
                    />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Line type="monotone" dataKey="scheduled" stroke="red" name="Total Schedule Hours" />
                    <Line type="monotone" dataKey="worked" stroke="blue" name="Total Work Hours" />
                    <Line type="monotone" dataKey="average" stroke="orange" name="Average Hours" />
                </LineChart>
            </ResponsiveContainer>

            <div className="overflow-x-auto mt-4">
                <table className="min-w-full border border-gray-300 text-xs text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">Week</th>
                            <th className="border px-2 py-1">Description</th>
                            <th className="border px-2 py-1">Scheduled Hours</th>
                            <th className="border px-2 py-1">Worked Hours</th>
                            <th className="border px-2 py-1">Average Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-100">
                                <td className="border px-2 py-1 text-blue-700 font-semibold">
                                    {row.week}
                                </td>
                                <td className="border px-2 py-1">Working Hours</td>
                                <td className="border px-2 py-1">{row.scheduledLabel}</td>
                                <td className="border px-2 py-1">{row.workedLabel}</td>
                                <td className="border px-2 py-1">{row.averageLabel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeAttendance;
