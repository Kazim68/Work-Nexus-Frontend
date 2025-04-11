import { FaClock } from "react-icons/fa";

const CheckInOut = () => {
  return (
    <div className="flex gap-4 p-4 rounded-lg w-full">
      {/* Check In */}
      <div className="flex-1 flex flex-col items-center rounded-lg shadow-sm group relative">
        <div className="flex items-center gap-2 p-4 border border-amber-600 rounded-sm w-full cursor-pointer">
          <div className="flex justify-center items-center w-12 h-12  rounded-full">
            <FaClock className="text-amber-600" size={24} />
          </div>
          <div>
            <p className="text-lg text-white font-semibold">9:30am</p>
            <p className="text-sm text-white">Clock In</p>
          </div>
        </div>

        {/* Dropdown Button */}
        <div className="absolute left-0 w-full opacity-0 invisible translate-y-[-10px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-18 transition-all duration-500 ease-in-out bg-white shadow-md rounded-lg">
          <button className="w-full bg-green-400 text-white py-2 font-semibold rounded-b-lg cursor-pointer">
            Check In
          </button>
        </div>
      </div>

      {/* Check Out */}
      <div className="flex-1 flex flex-col items-center border border-amber-600 rounded-sm shadow-sm group relative">
        <div className="flex items-center gap-2 p-4 border-amber-600  w-full cursor-pointer">
          <div className="flex justify-center items-center w-12 h-12  rounded-full">
            <FaClock className="text-amber-600" size={24} />
          </div>
          <div>
            <p className="text-lg text-white font-semibold">6:00pm</p>
            <p className="text-sm text-white">Clock Out</p>
          </div>
        </div>

        {/* Dropdown Button */}
        <div className="absolute left-0 w-full opacity-0 invisible translate-y-[-10px] group-hover:opacity-100 group-hover:visible group-hover:translate-y-18 transition-all duration-500 ease-in-out bg-white shadow-md rounded-lg">
          <button className="w-full bg-red-400 text-white py-2 font-semibold rounded-b-lg cursor-pointer">
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;
