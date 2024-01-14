import React from "react";
import Dropdown from "../components/Dropdown";
import { generateYearRange, months } from "../helpers/utils";

interface CalendarHeaderProps {
  currentMonth: Date;
  onMonthChange: (monthIndex: number) => void;
  onYearChange: (year: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
  onYearChange,
  onPrevMonth,
  onNextMonth,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-lg shadow">
      <button
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        onClick={onPrevMonth}
      >
        Prev
      </button>
      <div className="flex gap-2">
        <Dropdown
          options={months}
          defaultLabel={months[currentMonth.getMonth()]}
          onSelect={(month) => onMonthChange(months.indexOf(month as string))}
        />
        <Dropdown
          options={generateYearRange(10)}
          defaultLabel={String(currentMonth.getFullYear())}
          onSelect={(year) => onYearChange(Number(year))}
        />
      </div>
      <button
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        onClick={onNextMonth}
      >
        Next
      </button>
    </div>
  );
};

export default CalendarHeader;
