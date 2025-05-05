import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import { fetchOne } from "../../Api/Api";

const weekNames = {
    1: "First Week",
    2: "Second Week",
    3: "Third Week",
    4: "Fourth Week",
    5: "Fifth Week",
};

const EmployeeAttendance = ({ employees }) => {
    const { data } = useSelector((state) => state.user);
    const [selectedEmployee, setSelectedEmployee] = useState(data.employee._id || "");
    const workingHoursString = data.employee.companyID.workTimings?.[0];

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
    const weeklyHours = dailyWorkingHours * 5;

    const { data: weeklyAttendance } = useQuery({
        queryKey: ["get_weekly", selectedEmployee],
        queryFn: () =>
            fetchOne("/attendance/weekly", selectedEmployee, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
        enabled: !!selectedEmployee,
        staleTime: 0,
        cacheTime: 0,
    });

    const graphData = weeklyAttendance?.data?.map((item, idx) => ({
        week: weekNames[idx + 1] || `Week ${idx + 1}`,
        scheduled: weeklyHours,
        worked: timeToDecimalHours(item.workedHours),
        average: timeToDecimalHours(item.averageHours),
        scheduledLabel: weeklyHours,
        workedLabel: item.workedHours,
        averageLabel: item.averageHours,
    })) || [];

    function timeToDecimalHours(time) {
        if (!time) return 0;
        const [h, m, s] = time.split(":").map(Number);
        return h + m / 60 + s / 3600;
    }

    return (
        <div className="p-4  border border-amber-600 rounded-2xl shadow-lg text-xs text-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                    📈 EMPLOYEE ATTENDANCE VISUALIZATION
                </h2>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-300">Employee:</span>
                    <select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        className="p-1 rounded border border-[#F99932] bg-[#212020] text-orange-500 text-[12px]"
                    >
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                                {emp.firstName} {emp.lastName} ({emp.employeeCode})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#ccc" }} />
                    <YAxis
                        label={{
                            value: "Hours",
                            angle: -90,
                            position: "insideLeft",
                            offset: 5,
                            fontSize: 10,
                            fill: "#ccc"
                        }}
                        domain={[0, 50]}
                        tick={{ fontSize: 10, fill: "#ccc" }}
                    />
                    <Tooltip contentStyle={{ backgroundColor: "#333", borderColor: "#555" }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="scheduled" stroke="#ef4444" name="Scheduled Hours" />
                    <Line type="monotone" dataKey="worked" stroke="#3b82f6" name="Worked Hours" />
                    <Line type="monotone" dataKey="average" stroke="#f59e0b" name="Average Hours" />
                </LineChart>
            </ResponsiveContainer>

            <div className="overflow-x-auto mt-6">
                <table className="min-w-full border border-gray-700 text-xs text-left">
                    <thead className="bg-gray-800">
                        <tr>
                            <th className="border border-gray-700 px-3 py-2">Week</th>
                            <th className="border border-gray-700 px-3 py-2">Description</th>
                            <th className="border border-gray-700 px-3 py-2">Scheduled Hours</th>
                            <th className="border border-gray-700 px-3 py-2">Worked Hours</th>
                            <th className="border border-gray-700 px-3 py-2">Average Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {graphData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-800">
                                <td className="border border-gray-700 px-3 py-2 text-blue-400 font-semibold">
                                    {row.week}
                                </td>
                                <td className="border border-gray-700 px-3 py-2">Working Hours</td>
                                <td className="border border-gray-700 px-3 py-2">{row.scheduledLabel}</td>
                                <td className="border border-gray-700 px-3 py-2">{row.workedLabel}</td>
                                <td className="border border-gray-700 px-3 py-2">{row.averageLabel}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeAttendance;
