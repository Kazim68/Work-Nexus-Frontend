import React, { useState, useEffect, useCallback, useMemo } from "react";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-quartz.css"; // ONLY KEEP THIS
import TokenResolveModal from "./TokenResolveModal";

// Register AG-Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

const TokenResolve = ({ tokens }) => {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Utility functions
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY
  };

  // Prepare rowData when tokens change
  useEffect(() => {
    if (tokens?.tokens && Array.isArray(tokens.tokens)) {
      const openTokens = tokens.tokens.filter(token => token.Status !== "");

      const formattedTokens = openTokens.map(token => ({
        ...token,
        raisedOnDayName: getDayName(token.RaisedDate),
        raisedOnFormatted: formatDate(token.RaisedDate),
      }));

      setRowData(formattedTokens);
    }
  }, [tokens]);

  // Open/Close Modal Handlers
  const openModal = useCallback((row) => {
    setSelectedRow(row);
    setShowModal(true);
  }, []);

  const closeModal = () => {
    setSelectedRow(null);
    setShowModal(false);
  };

  // View Details Button Renderer - Only for "open" status
  const ViewDetailsRenderer = ({ data }) => {
    if (data.Status?.toLowerCase() !== "open") {
      return null; // No button if status is not open
    }

    return (
      <button
        onClick={() => openModal(data)}
        className="underline cursor-pointer text-purple-700"
      >
        View Details
      </button>
    );
  };

  // Status Badge Renderer
  const StatusRenderer = ({ value }) => {
    let bgColor = "";
    let textColor = "text-white";

    switch (value?.toLowerCase()) {
      case "open":
        bgColor = "bg-yellow-400";
        break;
      case "rejected":
        bgColor = "bg-red-500";
        break;
      case "resolved":
        bgColor = "bg-green-500";
        break;
      default:
        bgColor = "bg-gray-400";
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-bold ${bgColor} ${textColor}`}>
        {value || "Unknown"}
      </span>
    );
  };

  // Column Definitions
  const colDefs = useMemo(() => [
    {
      headerName: "Raised On (Date)",
      field: "raisedOnFormatted",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Raised On (Day)",
      field: "raisedOnDayName",
      sortable: true,
      filter: true,
    },
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
      field: "IssueType",
      headerName: "Issue Type",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Status",
      field: "Status",
      cellRenderer: StatusRenderer,
      sortable: true,
      filter: true,
    },
    {
      headerName: "",
      field: "viewDetails",
      cellRenderer: ViewDetailsRenderer,
    },
  ], [openModal]);

  // AG-Grid Custom Theme
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
        Raised Tickets
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

      <TokenResolveModal
        showModal={showModal}
        closeModal={closeModal}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default TokenResolve;
