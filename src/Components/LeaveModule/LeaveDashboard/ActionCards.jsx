import React, { useState } from "react";
import { FaUserEdit, FaCalendarAlt, FaHandPointer, FaFileInvoiceDollar } from "react-icons/fa";
import TokenModal from "../../Tokens/TokenModal";


const actions = [
  { icon: <FaUserEdit size={40} />, label: "Apply For Leave" },
  { icon: <FaCalendarAlt size={40} />, label: "My Attendance" },
  { icon: <FaHandPointer size={40} />, label: "Raise Token" },
  { icon: <FaFileInvoiceDollar size={40} />, label: "My Payroll" },
];

const ActionCards = () => {
  const [showModal, setShowModal] = useState(false);

  const handleActionClick = (label) => {
    if (label === "Raise Token") {
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {actions.map((action, index) => (
            <div
              key={index}
              onClick={() => handleActionClick(action.label)}
              className="shadow-md rounded-lg flex flex-col border border-amber-600 items-center justify-center p-5 w-full cursor-pointer transition"
            >
              <div className="flex items-center justify-center w-16 h-16 text-amber-600 rounded-full mb-3">
                {action.icon}
              </div>
              <p className="text-sm font-semibold text-center text-white">{action.label}</p>
            </div>
          ))}
        </div>
      </div>

      <TokenModal  isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default ActionCards;
