import { Dayjs } from "dayjs";
import React from "react";
import {
  SelectedRange,
  generateMonthMatrix,
  getCurrentDay,
  getIsWeekend,
  isWithinRange,
  weekDays,
} from "../helpers/utils";

interface CalendarDatePickerProps {
  currentMonth: Dayjs;
  selectedRange: SelectedRange;
  handleDayClick: (day: Dayjs) => void;
}

const today = getCurrentDay();

const getDayClassName = (
  day: Dayjs,
  currentMonth: Dayjs,
  selectedRange: SelectedRange
): string => {
  const isWeekend = getIsWeekend(day);
  const isStart = day?.isSame(selectedRange.start, "day");
  const isEnd = day?.isSame(selectedRange.end, "day");
  const inRange =
    day && isWithinRange(day, selectedRange.start, selectedRange.end);
  const isToday = day?.isSame(today, "day");
  const isCurrentMonth = day?.month() === currentMonth.month();

  const baseClass =
    "w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ";

  const className =
    isStart || isEnd
      ? `${baseClass} bg-green-500 text-white`
      : inRange && !isWeekend
      ? `${baseClass} bg-blue-500 text-white`
      : isWeekend
      ? `${baseClass} bg-gray-400 text-black pointer-events-none`
      : !isCurrentMonth
      ? `${baseClass} bg-gray-100 text-gray-500`
      : `${baseClass} bg-blue-200`;

  return isToday ? `${className} border-2 border-red-500` : className;
};

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  currentMonth,
  selectedRange,
  handleDayClick,
}) => {
  const renderMatrix = (): JSX.Element[] => {
    const matrix = generateMonthMatrix(currentMonth);

    return matrix.map((week, weekIndex) => (
      <div key={weekIndex} className="flex justify-evenly">
        {week.map((day, dayIndex) => {
          const className = getDayClassName(day, currentMonth, selectedRange);
          const isNotWeekend = !getIsWeekend(day);
          return (
            <div
              key={dayIndex}
              className={className}
              onClick={() => day && isNotWeekend && handleDayClick(day)}
            >
              {day && day.format("D")}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <>
      <div className="flex justify-evenly">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="w-10 h-10 flex items-center font-bold justify-center rounded-full cursor-pointer  "
          >
            {day}
          </div>
        ))}
      </div>
      {renderMatrix()}
    </>
  );
};

export default CalendarDatePicker;
