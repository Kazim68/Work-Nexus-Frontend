import React from "react";
import contactFrame from "../../assets/images/contactframe.png";
import designationImg from "../../assets/images/designation.png";
import itDepartmentImg from "../../assets/images/itdepartment.png";
import startDateImg from "../../assets/images/startdate.png";

const employeeData = [
  { title: "101", subtitle: "Employee NO", image: contactFrame },
  { title: "IT Department", subtitle: "Department", image: itDepartmentImg },
  { title: "03/10/2023", subtitle: "Joining Date", image: startDateImg },
  { title: "UI/UX Designer", subtitle: "Designation", image: designationImg },
];

const EmployeeDetails = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {employeeData.map((item, index) => (
        <div key={index} className="bg-gray h-28 w-65 p-4 shadow-md rounded-md flex items-center">
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            <img src={item.image} alt={item.subtitle} className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeDetails;
