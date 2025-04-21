import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { fetchAll } from "../../Api/Api";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import "ag-grid-community/styles/ag-theme-quartz.css"; // ONLY KEEP THIS
import TokenResolveModal from "./TokenResolveModal";

ModuleRegistry.registerModules([AllCommunityModule]);

const TokenResolve = ({tokens}) => {

  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle rowData setting based on tokens data
  useEffect(() => {
    if (tokens?.tokens && Array.isArray(tokens.tokens)) {
      const openTokens = tokens.tokens.filter(token => token.Status === "Open");
      setRowData(openTokens);
    }
  }, [tokens]);

  const openModal = useCallback((row) => {
    setSelectedRow(row);
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setSelectedRow(null);
    setShowModal(false);
  };

  const ViewDetailsRenderer = ({ data }) => (
    <button
      onClick={() => openModal(data)}
      className="underline cursor-pointer text-purple-700"
    >
      View Details
    </button>
  );

  const colDefs = useMemo(() => [
    {
      headerName: "Employee",
      field: "EmployeeID",
      sortable: true,
      filter: true,
      valueGetter: (params) => {
        const emp = params.data.EmployeeID;
        return emp ? `${emp.firstName} ${emp.lastName}` : "N/A";
      },
    },
    {
      field: "IssueType", // Assuming IssueType is the correct field for issues
      sortable: true,
      filter: true,
    },
    {
      headerName: "",
      field: "viewDetails",
      cellRenderer: ViewDetailsRenderer,
    },
  ], [openModal]);

  const myTheme = themeQuartz.withParams({
    backgroundColor: "#212020",
    foregroundColor: "#fff",
    headerTextColor: "#f77f00",
    headerBackgroundColor: "#212020",
    oddRowBackgroundColor: "rgba(0, 0, 0, 0.03)",
    headerColumnResizeHandleColor: "#f77f00",
  });

  return (
    <div className="p-6 shadow-lg rounded-lg w-full min-h-[400px]">
      <h2 className="text-xl font-semibold text-amber-600 mb-4">
        Attendance Summary
      </h2>

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

      <TokenResolveModal showModal={showModal} closeModal={closeModal} selectedRow={selectedRow}></TokenResolveModal>
    </div>
  );
};

export default TokenResolve;
