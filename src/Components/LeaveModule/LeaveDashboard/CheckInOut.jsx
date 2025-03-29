import { FaClock } from "react-icons/fa";

const CheckInOut = () => {
  return (
    <div className="flex gap-4 p-4 rounded-lg  w-full max-w-md">
      {/* Check In */}
      <div className="flex-1 flex flex-col items-center rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 p-4 bg-white w-full">
          <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full">
            <FaClock className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-lg font-semibold">9:30am</p>
            <p className="text-sm text-gray-500">Clock In</p>
          </div>
        </div>
        <button className="w-full bg-green-400 text-white py-2 font-semibold">Check In</button>
      </div>
      
      {/* Check Out */}
      <div className="flex-1 flex flex-col items-center rounded-lg overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 p-4 bg-white w-full">
          <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-full">
            <FaClock className="text-gray-500" size={24} />
          </div>
          <div>
            <p className="text-lg font-semibold">6:00pm</p>
            <p className="text-sm text-gray-500">Clock Out</p>
          </div>
        </div>
        <button className="w-full bg-red-400 text-white py-2 font-semibold">Check Out</button>
      </div>
    </div>
  );
};

export default CheckInOut;
