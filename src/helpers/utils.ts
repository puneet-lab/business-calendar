import dayjs, { Dayjs } from "dayjs";

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
