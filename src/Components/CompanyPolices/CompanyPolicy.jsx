import React from "react";
import Layout from "../Layout/Layout";
const data = [
    { id: "01", title: "Employee Relations" },
    { id: "02", title: "Performance Management" },
    { id: "03", title: "Recruiting and Hiring" },
    { id: "04", title: "Development and Training" },
    { id: "05", title: "Sharing Knowledge" },
    { id: "06", title: "Employee Relations" },
    { id: "07", title: "Safety and Security" },
    { id: "08", title: "Compensation and Benefits" },
    { id: "09", title: "Termination and Resignation" },
    { id: "10", title: "Awards and Recognitions" },
];

const Card = ({ id, title }) => {
    return (
        <div className="relative w-[450px] marginLeft: -20px h-[100px] flex items-center bg-white shadow-lg rounded-md overflow-hidden">
            {/* Left Section with ID (Triangular Shape) */}
            <div 
                className="w-[180px] h-full flex items-center justify-center text-white text-3xl font-bold relative"
                style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%, 0% 100%)",
                    marginLeft: "-15px",
                    marginTop: "6px",
                    backgroundColor:"#9EE293"
                }}
            >
                <span>{id}</span>
            </div>

            {/* Right Section with Title */}
            <div className="flex-1 px-6 text-xl font-medium text-gray-00">{title}</div>
        </div>
    );
};



const CompanyPolicies = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {data.map((item) => (
                        <Card key={item.id} id={item.id} title={item.title} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CompanyPolicies;
