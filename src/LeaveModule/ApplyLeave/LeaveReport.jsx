import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const LeaveReport = () => {
  // Sample Leave Data
  const rows = [
    { id: 1, from: "24/11/2023", to: "02/12/2023", days: 8, type: "Sick Leave", reason: "...............", status: "Approved" },
    { id: 2, from: "20/11/2024", to: "10/11/2024", days: 3, type: "Sick Leave", reason: "...............", status: "Pending" },
  ];

  // Columns
  const columns = [
    { field: "id", headerName: "Sr No", width: 80 },
    { field: "from", headerName: "From Date", width: 120 },
    { field: "to", headerName: "To Date", width: 120 },
    { field: "days", headerName: "No. of Days", width: 120 },
    { field: "type", headerName: "Leave Type", width: 150 },
    { field: "reason", headerName: "Reason for Leave", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-white font-medium text-sm ${
            params.value === "Approved" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {params.value}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* Header */}
      <h2 className="text-xl font-semibold text-teal-600 mb-4">Leave Report</h2>

      {/* Data Grid with Built-in Search */}
      <div className="h-64">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }} // Enables search & filters
        />
      </div>
    </div>
  );
};

export default LeaveReport;
