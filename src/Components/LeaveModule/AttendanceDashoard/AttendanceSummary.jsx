import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const AttendanceSummary = () => {
  const [search, setSearch] = useState("");

  // Sample Attendance Data
  const rows = [
    { id: 1, Date: "24/11/2023", Day: "Monday", Name: "John Doe", ClockIn: "9:00 AM", ClockOut: "6:00 PM", WorkingHour: "9h", OverTime: "1h" },
    { id: 2, Date: "20/11/2024", Day: "Wednesday", Name: "Jane Smith", ClockIn: "9:30 AM", ClockOut: "6:30 PM", WorkingHour: "9h", OverTime: "0h" },
  ];

  // Columns
  const columns = [
    { field: "Date", headerName: "Date", width: 120 },
    { field: "Day", headerName: "Day", width: 120 },
    { field: "Name", headerName: "Name", width: 120 },
    { field: "ClockIn", headerName: "Clock In", width: 120 },
    { field: "ClockOut", headerName: "Clock Out", width: 120 },
    { field: "WorkingHour", headerName: "Working Hours", width: 150 },
    { field: "OverTime", headerName: "Over Time", width: 120 },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full min-h-[400px]">
      {/* Header: Title + Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-teal-600">Attendance Summary</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Attendance Table */}
      <div className="h-64">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  );
};

export default AttendanceSummary;
