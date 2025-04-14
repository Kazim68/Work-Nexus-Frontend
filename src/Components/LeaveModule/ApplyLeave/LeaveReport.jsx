import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getLeaveReport, cancelLeaveRequest } from "../../../Api/Employee/Leaves.js";
import { toast } from "react-toastify";


const LeaveReport = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => { 

    const getGridData = async () => {
      try {
        const res = await getLeaveReport(); // assuming this returns an array of leaves
        console.log("Leave Report Data:", res); 

        const mappedRows = res.leaves.map((leave, index) => ({
          id: index + 1, 
          leaveId: leave._id,
          from: new Date(leave.LeaveStartDate).toLocaleDateString(),
          to: new Date(leave.LeaveEndDate).toLocaleDateString(),
          days: getDaysDiff(leave.LeaveStartDate, leave.LeaveEndDate),
          type: capitalize(leave.LeaveType),
          reason: leave.LeaveReason,
          status: capitalize(leave.LeaveStatus),
        }));

        setRows(mappedRows);
      } catch (err) {
        console.error("Error fetching leaves:", err);
      }
    };
    getGridData();

  }, []);

  // Helper functions
  const getDaysDiff = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const capitalize = (str) => str?.charAt(0).toUpperCase() + str.slice(1);

  const handleCancel = async (id) => {
    try {
      console.log("Cancelled leave request for ID:", id);
      await cancelLeaveRequest(id); 
      toast.success("Leave request cancelled successfully");
      setRows((prev) => 
        prev
          .filter(row => row.leaveId !== id)
          .map((row, index) => ({ ...row, id: index + 1 })) // re-index IDs
      );
      
      
    } catch (error) {
      console.error("Error cancelling leave request:", error);
      toast.error("Error cancelling leave request");
    }
  };

  const columns = [
    { field: "id", headerName: "Sr No", width: 80 },
    { field: "from", headerName: "From Date", width: 120 },
    { field: "to", headerName: "To Date", width: 120 },
    { field: "days", headerName: "Days", width: 100 },
    { field: "type", headerName: "Type", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-white font-medium text-sm ${params.value === "Approved"
              ? "bg-green-600"
              : params.value === "Pending"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
        >
          {params.value}
        </span>
      ),
    }
    ,
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) =>
        params.row.status === "Pending" ? (
          <button
            className="px-3 py-1 cursor-pointer rounded-full text-white bg-red-600 hover:bg-red-700 font-medium text-sm"
            onClick={() => handleCancel(params.row.leaveId)}
          >
            Cancel
          </button>
        ) : (
          "-"
        ),
    }
    ,
  ];

  return (
    <div className=" bg-[#] text-white rounded-md shadow-md">

      <div className="h-80">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          sx={{
            backgroundColor: 'bg-[#]',           // main grid background
            color: '#f3f4f6',                     // grid text color
            border: '1px solid #f59e0b',          // amber border
            borderRadius: '0.5rem',

            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#1f2937 !important', // Force override
              color: '#facc15',
              fontWeight: 700,
              fontSize: '0.9rem',
              borderBottom: '1px solid #f59e0b',
            },

            '& .MuiDataGrid-cell': {
              color: '#e5e7eb',                   // light text for rows
              borderBottom: '1px solid #374151',  // subtle row separator
            },

            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#374151',         // hover effect
            },

            '& .MuiDataGrid-footerContainer': {
              backgroundColor: 'bg-[#]',
              color: '#f3f4f6',
              borderTop: '1px solid #f59e0b',
            },

            '& .MuiTablePagination-root': {
              color: '#f3f4f6',
            }
          }}
        />
      </div>
    </div>
  );
}

export default LeaveReport;
