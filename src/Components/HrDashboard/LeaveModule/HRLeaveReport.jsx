import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaHistory } from "react-icons/fa";
import { getLeaveReportOfMonth } from '../../../Api/Employee/Leaves';

const HRLeaveHistory = () => {
  const [filter, setFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => { 
    const fetchLeaveData = async () => {
      try {
        const response = await getLeaveReportOfMonth();
        if (response.success) {
          console.log("Leave data fetched successfully:", response.leaves);
          const formattedData = response.leaves.map((leave, index) => ({
            id: index + 1,
            employeeName: leave.employeeName.toUpperCase(),
            fromDate: leave.fromDate.split("T")[0],
            toDate: leave.toDate.split("T")[0],
            days: leave.noOfDays,
            type: leave.leaveType.toUpperCase(),
            status: leave.status.toUpperCase(),
          }));
          setLeaveData(formattedData);
        } else {
          console.error("Error fetching leave data");
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, []);

  const columns = [
    { field: "id", headerName: "Sr.No", width: 70 },
    { field: "employeeName", headerName: "Employee Name", width: 150 },
    { field: "fromDate", headerName: "From Date", width: 120 },
    { field: "toDate", headerName: "To Date", width: 120 },
    { field: "days", headerName: "No. of Days", width: 120 },
    { field: "type", headerName: "Leave Type", width: 150 },
    { 
      field: "status", 
      headerName: "Status", 
      width: 120,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded text-white text-xs ${
            params.value === "APPROVED" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {params.value}
        </span>
      )
    },
  ];

  const filteredData = leaveData.filter((row) => {
    if (filter !== "All" && row.status !== filter.toUpperCase()) return false;
    if (searchText && !row.employeeName.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="border border-amber-600 rounded-xl p-4 w-full bg-[#333334] text-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FaHistory size={24} />
          <span className="text-sm font-medium">History</span>
          {/* Filters */}
          <div className="flex ml-6 gap-2">
            {["All", "Approved", "Rejected"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-1 rounded ${
                  filter === item ? "bg-amber-600 text-white" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Employee Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-amber-600 text-white placeholder-white  px-4 py-2 rounded focus:outline-none w-60"
        />
      </div>

      {/* Data Grid */}
      <div className="h-[500px] w-full">
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          disableSelectionOnClick
          sx={{
            color: "white",
            borderColor: "orange",
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid gray",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#333334",
              color: " #333334",
              fontWeight: "bold",
              borderBottom: "2px solid orange",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#333334",
            },
          }}
        />
      </div>
    </div>
  );
};

export default HRLeaveHistory;
