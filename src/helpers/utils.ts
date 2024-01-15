import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export enum RangeType {
  Last7D = "Last7D",
  Last30D = "Last30D",
  _7D = "7D",
  _30D = "30D",
}

export const DAYS_OF_WEEK = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0,
};

export interface SelectedRange {
  start: Dayjs | null;
  end: Dayjs | null;
}

export const WEEK_START = DAYS_OF_WEEK.MONDAY;
export const WEEK_LENGTH = 7;

export const getCurrentDay = (): Dayjs => dayjs();

export const addMonths = (date: Dayjs, amount: number): Dayjs => {
  return date.add(amount, "month");
};

export const setMonth = (date: Dayjs, month: number): Dayjs => {
  return date.month(month);
};

export const setYear = (date: Dayjs, year: number): Dayjs => {
  return date.year(year);
};

export const generateYearRange = (
  span: number,
  currentYear = new Date().getFullYear()
): number[] => {
  return Array.from(
    { length: span },
    (_, i) => currentYear - Math.floor(span / 2) + i
  );
};

export const generateMonthMatrix = (currentMonth: Dayjs): Dayjs[][] => {
  const startOfTheMonth = currentMonth.startOf("month");
  let firstDayOfWeek = startOfTheMonth.day();

  firstDayOfWeek =
    firstDayOfWeek === DAYS_OF_WEEK.SUNDAY ? WEEK_LENGTH : firstDayOfWeek;
  let dayCounter = startOfTheMonth.subtract(firstDayOfWeek - WEEK_START, "day");

  const matrix: Dayjs[][] = [];
  for (let week = 0; week < 6; week++) {
    const weekRow: Dayjs[] = [];
    for (let i = 0; i < WEEK_LENGTH; i++) {
      weekRow.push(dayCounter);
      dayCounter = dayCounter.add(1, "day");
    }
    matrix.push(weekRow);
  }
  return matrix;
};

export const getIsWeekend = (day: Dayjs): boolean => {
  return (
    day.day() === DAYS_OF_WEEK.SATURDAY || day.day() === DAYS_OF_WEEK.SUNDAY
  );
};

export const isWithinRange = (
  day: Dayjs,
  start: Dayjs | null,
  end: Dayjs | null
): boolean => {
  if (!start || !end) return false;
  return day.isBetween(start, end, "day", "[]");
};
