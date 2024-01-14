import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { addMonths, setMonth, setYear } from "../helpers/utils";
import CalendarHeader from "./CalendarHeader";

const BusinessCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  const handlePrevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleMonthChange = (monthIndex: number) =>
    setCurrentMonth(setMonth(currentMonth, monthIndex));
  const handleYearChange = (year: number) =>
    setCurrentMonth(setYear(currentMonth, year));

  return (
    <>
      <div className=" grid gap-2 max-w-md mx-auto border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <CalendarHeader
          currentMonth={currentMonth.toDate()}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
    </>
  );
};

export default BusinessCalendar;
