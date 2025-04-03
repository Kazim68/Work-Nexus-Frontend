import React from "react";

const profileData = {
  name: "Malick Barr",
  email: "malickbarr123@gmail.com",
  imageUrl: "https://i.pravatar.cc/100"
};

const Profile = () => {
  return (
    <div className="flex items-center p-4 bg-gray rounded-md">
      <img src={profileData.imageUrl} alt="Profile" className="w-35 h-35 rounded-full" />
      <div className="ml-4">
        <h2 className="text-xl font-semibold">{profileData.name}</h2>
        <p className="text-gray-600">{profileData.email}</p>
      </div>
    </div>
  );
};

export default Profile;
