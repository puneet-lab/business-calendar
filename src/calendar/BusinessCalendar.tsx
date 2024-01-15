import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import {
  SelectedRange,
  addMonths,
  findWeekendDatesInRange,
  setMonth,
  setYear,
} from "../helpers/utils";
import CalendarDatePicker from "./CalendarDatePicker";
import CalendarFooter from "./CalendarFooter";
import CalendarHeader from "./CalendarHeader";

const BusinessCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedRange, setSelectedRange] = useState<SelectedRange>({
    start: null,
    end: null,
  });

  const handlePrevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleMonthChange = (monthIndex: number) =>
    setCurrentMonth(setMonth(currentMonth, monthIndex));
  const handleYearChange = (year: number) =>
    setCurrentMonth(setYear(currentMonth, year));

  const handleDayClick = (day: Dayjs) => {
    const { start, end } = selectedRange;
    if (!start || (start && end)) {
      setSelectedRange({ start: day, end: null });
    } else {
      if (day.isBefore(start, "day")) {
        setSelectedRange({ start: day, end: start });
      } else {
        setSelectedRange({ start, end: day });
      }
    }
  };

  const handleRangeSelect = (start: Dayjs, end: Dayjs) => {
    setSelectedRange({ start, end });
  };

  useEffect(() => {
    const computeAndReturnRange = () => {
      if (selectedRange.start && selectedRange.end) {
        const weekends = findWeekendDatesInRange(
          selectedRange.start,
          selectedRange.end
        );

        const result = {
          range: [
            selectedRange.start.format("YYYY-MM-DD"),
            selectedRange.end.format("YYYY-MM-DD"),
          ],
          weekends: weekends.map((w) => w.format("YYYY-MM-DD")),
        };
        console.log(result);
      }
    };

    computeAndReturnRange();
  }, [selectedRange]);

  return (
    <>
      <div className=" grid gap-2 max-w-md mx-auto border border-gray-300 shadow-lg rounded-lg overflow-hidden bg-white">
        <CalendarHeader
          currentMonth={currentMonth.toDate()}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <CalendarDatePicker
          currentMonth={currentMonth}
          selectedRange={selectedRange}
          handleDayClick={handleDayClick}
        />
        <CalendarFooter
          onSelectRange={handleRangeSelect}
          selectedRange={selectedRange}
        />
      </div>
    </>
  );
};

export default BusinessCalendar;
