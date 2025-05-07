import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createBlobWithAuth } from "../../Api/Api";
import ButtonLoader from "../Shared/ButtonLoader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const EmployeeOnBoard = () => {
  const { data } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data || !data.token) {
      toast.error("Unauthorized, Sign in again");
      navigate("/signin");
    }
  }, [data, navigate]);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);
  const companyId = data?.employee?.companyID._id;
  const token = data?.token;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      // Required headers
      const requiredFields = [
        "First_Name",
        "Last_Name",
        "DateOfBirth",
        "Gender",
        "Address",
        "Phone_Number",
        "Email",
        "HireDate",
        "Role",
        "Employee_Code",
        "Department",
        "Designation",
        "Salary"
      ];

      const errors = [];
      const emailSet = new Set();
      const emp = new Set();


      jsonData.forEach((row, index) => {
        const rowNumber = index + 2; // +2 for Excel row (1-based, plus header)

        // Check for missing fields
        requiredFields.forEach((field) => {
          if (!row[field] || row[field].toString().trim() === "") {
            errors.push(`Row ${rowNumber}: ${field} is empty`);
          }
        });

        // Check for valid role
        if (row["Role"] && !["hr", "employee"].includes(row["Role"])) {
          errors.push(`Row ${rowNumber}: Invalid Role "${row["Role"]}" (should be 'hr' or 'employee')`);
        }

        // Check for duplicate emails
        const email = row["Email"]?.toLowerCase();
        if (emailSet.has(email)) {
          errors.push(`Row ${rowNumber}: Duplicate Email "${row["Email"]}"`);
        } else {
          emailSet.add(email);
        }

        const empCode = row["Employee_Code"];
        if (emp.has(empCode)) {
          errors.push(`Row ${rowNumber}: Duplicate Employee code "${row["Employee_Code"]}"`);
        } else {
          emp.add(empCode);
        }
      });

      if (errors.length > 0) {
        errors.forEach((err) => toast.error(err));
        setFile(null);
      } else {
        setFile(file);
        toast.success("File is valid and ready for upload.");
      }
    };

    reader.readAsArrayBuffer(file);
  };


  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");


    const formData = new FormData();
    formData.append("employees", file);
    setLoading(true);

    try {
      const response = await createBlobWithAuth(
        `/employee/upload/${companyId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      setBlobUrl(url);
      toast.success("File ready! Click 'Download File' to save it.");
    } catch (err) {
      toast.error("Upload failed. Please check the file and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  const downloadSample = () => {
    const sampleURL = "/sample/employee_upload_template.xlsx";
    const a = document.createElement("a");
    a.href = sampleURL;
    a.download = "employee_upload_template.xlsx";
    a.click();
  };

  const handleDownload = () => {
    if (!blobUrl) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = "employee_credentials.xlsx";
    a.click();
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen bg-[#212020] px-4 py-8 gap-8">
      {/* Upload Form */}
      <div className="bg-[#212020] p-10 rounded-2xl border border-amber-600 shadow-lg w-full max-w-md text-center space-y-6">
        <img
          src="https://img.icons8.com/ios-filled/50/d97706/upload.png"
          alt="Upload Icon"
          className="mx-auto mb-6"
        />
        <h2 className="text-2xl font-extrabold text-amber-600">
          Upload Employee Sheet
        </h2>
        <p className="text-white text-sm">
          Upload an Excel file to onboard employees and generate login
          credentials.
        </p>

        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 bg-[#212020] mt-4"
        />

        <div className="space-y-4 pt-6">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full cursor-pointer bg-amber-600 font-bold text-gray-100 py-3 rounded-lg hover:bg-amber-700 transition-all duration-300 ease-in-out"
          >
            {loading ? <ButtonLoader /> : "Upload and Generate"}
          </button>

          {blobUrl && (
            <button
              onClick={handleDownload}
              className="w-full cursor-pointer bg-green-700 font-bold text-white py-3 rounded-lg hover:bg-green-800 transition-all duration-300 ease-in-out"
            >
              Download File
            </button>
          )}

          <button
            onClick={downloadSample}
            className="w-full cursor-pointer bg-transparent border border-amber-600 text-amber-600 font-bold py-3 rounded-lg hover:bg-amber-600 hover:text-white transition-all duration-300 ease-in-out"
          >
            Download Sample Excel
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-gray-700 shadow-lg w-full max-w-md text-white space-y-4">
        <h3 className="text-xl font-bold text-amber-500 mb-2">
          ⚠️ Upload Instructions
        </h3>
        <ul className="list-disc pl-5 text-sm space-y-2">
          <li>Accepted formats: <strong>.xlsx, .xls</strong></li>
          <li>All columns are Required:
            <ul className="list-disc pl-5 mt-1">
              <li><code>First_Name:</code> First name of the employee</li>
              <li><code>Last_Name:</code> Last name of the employee</li>
              <li><code>DateOfBirth:</code> Employee's date of birth (e.g., 1990-01-01)</li>
              <li><code>Gender:</code> Gender of the employee (e.g., Male, Female)</li>
              <li><code>Address:</code> Full residential address</li>
              <li><code>Phone_Number:</code> Valid mobile number</li>
              <li><code>Email:</code> Valid and unique email address</li>
              <li><code>HireDate:</code> Date the employee joined the company (e.g., 2024-01-01)</li>
              <li><code>Role:</code> Role of employee (employee or hr)</li>
              <li><code>Employee_Code:</code> Unique employee code/ID</li>
              <li><code>Department:</code> Department name (e.g., HR, IT, Finance)</li>
            </ul>
          </li>
          <li>No duplicate emails allowed</li>
          <li>All emails must be valid</li>
          <li>Maximum file size: <strong>5MB</strong></li>
          <li>Ensure only one active worksheet</li>
          <li>Remove unused or empty rows</li>
        </ul>
        <p className="text-xs text-gray-400 pt-2">
          💡 Download the sample file to see the correct format.
        </p>
      </div>
    </div>
  );
};

export default EmployeeOnBoard;
