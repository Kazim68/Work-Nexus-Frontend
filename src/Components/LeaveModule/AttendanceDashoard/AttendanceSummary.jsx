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
    <div className="p-6 shadow-lg rounded-lg w-full min-h-[400px]">
      {/* Header: Title + Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-amber-600">Attendance Summary</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border text-white border-amber-600 rounded-md px-3 py-2 w-1/3 focus:outline-none"
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
    sx={{
      border: '1px solid #d97706',

      // Fix: Header row background
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#212020 !important', // gray-800
      },

      // Fix: Header text color and weight
      '& .MuiDataGrid-columnHeaderTitle': {
        color: '#d97706 !important', // amber-600
        fontWeight: 'bold !important',
      },

      // Fix: Override cell styles
      '& .MuiDataGrid-cell': {
        color: '#fcd34d',
        borderBottom: '1px solid #374151',
      },

      '& .MuiDataGrid-footerContainer': {
        color: '#d97706 !important',
        borderTop: '1px solid #d97706',
      },

      '& .MuiSvgIcon-root, & .MuiCheckbox-root svg': {
        color: '#f59e0b',
        fill: '#f59e0b',
      },
    }}
  />
</div>


    </div>
  );
};

export default AttendanceSummary;
