import React from "react";
import { useSelector } from "react-redux";


const Profile = () => {
  const {data} = useSelector((state) => state.user);

  return (
    <div className="flex items-start p-4 bg-gray rounded-md">
      <img src={data?.employee?.profilePic || "https://i.pravatar.cc/100" } alt="Profile" className="w-35 h-35 rounded-full" />
      <div className="ml-4">
        <h2 className="text-xl text-white font-semibold">{data?.employee?.name || null}</h2>
        <p className="text-white">{data?.employee?.email || null}</p>
      </div>
    </div>
  );
};

export default Profile;
