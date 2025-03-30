import { FaUserEdit, FaCalendarAlt, FaHandPointer, FaFileInvoiceDollar } from "react-icons/fa";

const actions = [
  { icon: <FaUserEdit size={40} />, label: "Apply For Leave" },
  { icon: <FaCalendarAlt size={40} />, label: "My Attendance" },
  { icon: <FaHandPointer size={40} />, label: "Raise Token" },
  { icon: <FaFileInvoiceDollar size={40} />, label: "My Payroll" }
];

const ActionCards = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {actions.map((action, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg flex flex-col items-center justify-center p-5 w-full">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
              {action.icon}
            </div>
            <p className="text-sm font-semibold text-center">{action.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionCards;
