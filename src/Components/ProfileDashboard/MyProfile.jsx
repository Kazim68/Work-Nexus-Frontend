import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdPassword } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const { data } = useSelector((state) => state.user);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center p-6 rounded-md w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img
            src={data?.employee?.profilePic || "https://i.pravatar.cc/100"}
            alt="Profile"
            className="w-35 h-35 object-cover rounded-full border-2 border-amber-600 mb-4"
          />
          <h2 className="text-2xl text-white font-semibold">
            {data?.employee?.name || "No Name"}
          </h2>
          <p className="text-white text-sm">
            {data?.employee?.email || "No Email"}
          </p>

          {/* Edit Profile Button */}
          <button
            className="flex items-center gap-2 mt-4 px-5 py-2 border-2 border-amber-600 text-white rounded-full hover:bg-white hover:text-amber-600 font-semibold transition"
          >
            <FaEdit className="text-lg" />
            Edit Profile
          </button>
        </div>

        {/* Change Password Button */}
        <button
          onClick={() => setIsChangePasswordOpen(true)}
          className="flex items-center justify-center gap-2 bg-amber-600 text-black font-semibold px-6 py-2 rounded-full hover:bg-amber-500 transition"
        >
          <MdPassword className="text-xl" />
          Change Password
        </button>
      </div>

      {/* Change Password Modal */}
      {isChangePasswordOpen && (
        <ChangePassword onClose={() => setIsChangePasswordOpen(false)} />
      )}
    </>
  );
};

export default Profile;