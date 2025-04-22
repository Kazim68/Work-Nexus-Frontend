import React from "react";
import { FaRegClock, FaEdit } from "react-icons/fa";


const ClockCard = ({ time, label }) => {
    return (
        <div className="relative bg-[#333334] text-white rounded-md p-4 border border-[#F99932] w-[200px] h-[100px]">
            {/* Edit Icon */}
            <div className="absolute top-2 right-2 border border-gray-500 rounded p-1 cursor-pointer hover:text-orange-500">
                <FaEdit size={12} />
            </div>

            {/* Clock Icon */}
            <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <FaRegClock className="text-gray-700 text-lg" />
                </div>
                <div>
                    <p className="text-orange-500 font-semibold text-[14px]">{time}</p>
                    <p className="text-sm text-white">{label}</p>
                </div>
            </div>
        </div>
    );
};

const ClockCards = () => {
    return (
        <div className="flex gap-4">
            <ClockCard time="9.30am" label="Clock In" />
            <ClockCard time="6.00pm" label="Clock Out" />
        </div>
    );
};

export default ClockCards;
