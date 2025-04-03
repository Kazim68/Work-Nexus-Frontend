import React from "react";

const bankInfo = {
  "Bank Name": "Punjab National Bank",
  "Account No": "XXXXXXXXXX",
  "IBAN No": "ZZZZZZZZZZZ",
  "Bank Location": "Noida sector-15 D block",
  "Branch Name": "Meezan Bank, Baghbanpura",
  "Branch Code": "0517",
  "Account Name": "Malick Barr",
};

const BankInfo = () => {
  return (
    <div className="bg-white min-h-[370px] w-150 p-6 rounded-md shadow-md">
      {Object.entries(bankInfo).map(([label, value], index) => (
        <div key={index} className="grid grid-cols-2 gap-4 items-center mb-5">
          <span className="ml-25 text-gray-500">{label}</span>
          <span className="text-gray-900">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default BankInfo;
