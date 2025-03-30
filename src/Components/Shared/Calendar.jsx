import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import dayjs from "dayjs";

const Calendar = ({ width , height ,ch }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={`bg-white shadow-lg rounded-xl p-5 ${width} ${height}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-teal-600 text-xl hover:text-teal-800">
          <MdKeyboardArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-teal-700">
          {currentDate.format("MMMM YYYY")}
        </h2>
        <button onClick={nextMonth} className="text-teal-600 text-xl hover:text-teal-800">
          <MdKeyboardArrowRight />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 text-gray-600 text-sm font-medium mb-2">
        {days.map((day) => (
          <div key={day} className="text-center">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array(startDay).fill(null).map((_, i) => (
          <div key={`empty-${i}`} className={`${ch}`}></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const isToday = dayjs().isSame(currentDate.date(day), "day");
          return (
            <div
              key={day}
              className={`${ch} flex items-center justify-center rounded-lg cursor-pointer transition 
              ${
                isToday
                  ? "bg-teal-500 text-white font-bold shadow-md"
                  : "hover:bg-teal-100 text-gray-700"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
