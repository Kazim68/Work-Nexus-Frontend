import React from "react";

const TotalEmployees = ({count}) => {
    return (
        <div className="text-white rounded-md p-6 border border-[#F99932] w-[170px] h-[300px] flex flex-col justify-center items-center text-center">
            <h2 className="text-lg font-semibold text-white">Total Employees</h2>
            <p className="text-5xl font-bold text-orange-500 mt-3">{count}</p>
        </div>
    );
};

export default TotalEmployees;
