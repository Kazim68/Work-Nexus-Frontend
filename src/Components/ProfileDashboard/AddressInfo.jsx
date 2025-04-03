import React from "react";

const addressInfo = {
  Country: "India",
  State: "Uttar Pradesh",
  City: "Noida",
  "Postal Code": "211307",
  "Street Address": "Noida sector-63 D block",
  "Home Number": "D-243 2nd Floor",
};

const AddressInfo = () => {
  return (
    <div className="bg-white min-h-[370px] w-150 p-6 rounded-md shadow-md">
      {Object.entries(addressInfo).map(([label, value], index) => (
        <div key={index} className="grid grid-cols-2 gap-4 items-center mb-6">
          <span className="ml-25 text-gray-500">{label}</span>
          <span className="text-gray-900">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default AddressInfo;
