import React, { useState, useEffect } from "react";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
ModuleRegistry.registerModules([AllCommunityModule]);

const AttendanceSummary = ({ cuurentMonthRows ,previousMonthRows}) => {
  const [rowData, setRowData] = useState([...cuurentMonthRows , ...previousMonthRows]);


  const [colDefs, setColDefs] = useState([
    { field: "Date", sortable: true, filter: true, flex: 1 },
    { field: "Day", sortable: true, filter: true },
    { field: "ClockIn", sortable: true, filter: true },
    { field: "ClockOut", sortable: true, filter: true },
    { field: "WorkingHour", sortable: true, filter: true },
    { field: "OverTime", sortable: true, filter: true, flex: 1 },
  ]);

  const myTheme = themeQuartz.withParams({
    backgroundColor: '#212020',
    foregroundColor: '#ffff',
    headerTextColor: '#f77f00',
    headerBackgroundColor: '#212020',
    oddRowBackgroundColor: 'rgb(0, 0, 0, 0.03)',
    headerColumnResizeHandleColor: '#f77f00',
  });

  return (
    <div className="p-6 shadow-lg rounded-lg w-full min-h-[400px]">
      <h2 className="text-xl font-semibold text-amber-600 mb-4">Attendance Summary</h2>
      <div style={{ height: 500 }}>
        <AgGridReact
          theme={myTheme}
          pagination={true}
          paginationPageSize={100}
          paginationPageSizeSelector={[10, 50, 100]}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
};

export default AttendanceSummary;
