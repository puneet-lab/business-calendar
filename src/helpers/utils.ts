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

export const addBusinessDays = (date: Dayjs, days: number): Dayjs => {
  let d = date;
  while (days > 0) {
    d = d.add(1, "day");
    if (!getIsWeekend(d)) days--;
  }
  return d;
};

export const subtractBusinessDays = (date: Dayjs, days: number): Dayjs => {
  let d = date;
  while (days > 0) {
    d = d.subtract(1, "day");
    if (!getIsWeekend(d)) days--;
  }
  return d;
};

export const calculateActiveButtonType = (
  selectedRange: SelectedRange
): RangeType | "" => {
  if (!selectedRange.start || !selectedRange.end) return "";

  const startDate = selectedRange.start.isBefore(selectedRange.end)
    ? selectedRange.start
    : selectedRange.end;
  const endDate = selectedRange.start.isBefore(selectedRange.end)
    ? selectedRange.end
    : selectedRange.start;

  const today = getCurrentDay();
  let diffDays = 0;
  let tempDate = startDate;
  while (tempDate.isBefore(endDate) || tempDate.isSame(endDate, "day")) {
    if (!getIsWeekend(tempDate)) {
      diffDays++;
    }
    tempDate = tempDate.add(1, "day");
  }

  const toCurrentDate =
    endDate.format("YYYY-MM-DD") === today.format("YYYY-MM-DD");

  const fromCurrentDate =
    startDate.format("YYYY-MM-DD") === today.format("YYYY-MM-DD");

  if (toCurrentDate) {
    switch (diffDays) {
      case 7:
        return RangeType.Last7D;
      case 30:
        return RangeType.Last30D;
      default:
        return "";
    }
  }

  if (fromCurrentDate) {
    switch (diffDays) {
      case 7:
        return RangeType._7D;
      case 30:
        return RangeType._30D;
      default:
        return "";
    }
  }
  return "";
};

export const setRangeBasedOnType = (
  type: RangeType
): { start: Dayjs; end: Dayjs } => {
  const today = getCurrentDay();
  let start = today;
  let end = today;

  switch (type) {
    case RangeType.Last7D:
      start = subtractBusinessDays(today, 6);
      end = today;
      break;
    case RangeType.Last30D:
      start = subtractBusinessDays(today, 29);
      end = today;
      break;
    case RangeType._7D:
      start = today;
      end = addBusinessDays(today, 6);
      break;
    case RangeType._30D:
      start = today;
      end = addBusinessDays(today, 29);
      break;
    default:
      break;
  }

  return { start, end };
};

export const findWeekendDatesInRange = (start: Dayjs, end: Dayjs): Dayjs[] => {
  let current = start;
  const weekends = [];

  while (current.isBefore(end) || current.isSame(end, "day")) {
    if (getIsWeekend(current)) {
      weekends.push(current);
    }
    current = current.add(1, "day");
  }

  return weekends;
};
