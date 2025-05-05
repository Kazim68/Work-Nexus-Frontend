import React from "react";
import { useSelector } from "react-redux";

import contactFrame from "../../assets/images/contactframe.png";
import designationImg from "../../assets/images/designation.png";
import itDepartmentImg from "../../assets/images/itdepartment.png";
import startDateImg from "../../assets/images/startdate.png";

const EmployeeDetails = () => {
  const { data } = useSelector((state) => state.user);
  const employee = data?.employee;

  // Create dynamic array using data from employee object
  const employeeData = [
    { 
      title: employee?.employeeCode || "N/A", // Empty
      subtitle: "Employee NO", 
      image: contactFrame 
    },
    { 
      title: employee?.department || "N/A", 
      subtitle: "Department", 
      image: itDepartmentImg 
    },
    { 
      title: employee?.hireDate ? new Date(employee.hireDate).toLocaleDateString() : "N/A",
      subtitle: "Joining Date", 
      image: startDateImg 
    },
    { 
      title: employee?.designation || "N/A", // fallback if populated object is available
      subtitle: "Designation", 
      image: designationImg 
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {employeeData.map((item, index) => (
        <div
          key={index}
          className="bg-gray h-28 w-65 p-4 shadow-md rounded-md flex items-center border border-amber-600"
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4">
            <img src={item.image} alt={item.subtitle} className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl text-white font-semibold">{item.title}</h3>
            <p className="text-white text-sm">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeDetails;
