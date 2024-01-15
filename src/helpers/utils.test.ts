import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import {
  RangeType,
  addBusinessDays,
  addMonths,
  calculateActiveButtonType,
  findWeekendDatesInRange,
  generateMonthMatrix,
  generateYearRange,
  getCurrentDay,
  getIsWeekend,
  isWithinRange,
  setMonth,
  setRangeBasedOnType,
  setYear,
  subtractBusinessDays,
} from "./utils";

describe("Utility functions", () => {
  describe("getCurrentDay", () => {
    it("returns the current day", () => {
      const today = new Date();
      const currentDay = getCurrentDay();
      expect(currentDay.format("YYYY-MM-DD")).toBe(
        dayjs(today).format("YYYY-MM-DD")
      );
    });

    describe("addMonths", () => {
      it("adds the correct number of months", () => {
        const date = dayjs("2021-01-01");
        expect(addMonths(date, 2).format("YYYY-MM")).toBe("2021-03");
        expect(addMonths(date, -1).format("YYYY-MM")).toBe("2020-12");
      });
    });

    // Testing setMonth
    describe("setMonth", () => {
      it("sets the correct month", () => {
        const date = dayjs("2021-01-01");
        expect(setMonth(date, 5).format("YYYY-MM")).toBe("2021-06"); // June (0-indexed)
        expect(setMonth(date, 11).format("YYYY-MM")).toBe("2021-12"); // December (0-indexed)
      });
    });

    // Testing setYear
    describe("setYear", () => {
      it("sets the correct year", () => {
        const date = dayjs("2021-01-01");
        expect(setYear(date, 2020).format("YYYY")).toBe("2020");
        expect(setYear(date, 2023).format("YYYY")).toBe("2023");
      });
    });
  });

  // Testing generateYearRange
  describe("generateYearRange", () => {
    it("generates a correct year range", () => {
      const currentYear = 2021;
      const span = 5; // e.g., 2019, 2020, 2021, 2022, 2023
      expect(generateYearRange(span, currentYear)).toEqual([
        2019, 2020, 2021, 2022, 2023,
      ]);
    });
  });

  // Testing generateMonthMatrix
  describe("generateMonthMatrix", () => {
    it("generates a correct month matrix", () => {
      const month = dayjs("2021-05-01"); // May 2021
      const matrix = generateMonthMatrix(month);

      expect(matrix.length).toBe(6); // 6 weeks (rows)

      // Check that the first day of the matrix is the last Monday of April
      expect(matrix[0][0].format("YYYY-MM-DD")).toBe("2021-04-26");

      // Check that the first day of the month is correctly placed
      // Find the position of the 1st of May
      const firstDayPosition = matrix
        .flat()
        .findIndex((day) => day.format("YYYY-MM-DD") === "2021-05-01");
      expect(firstDayPosition).toBeGreaterThanOrEqual(0); // Ensure the 1st of May is in the matrix
      expect(
        matrix[Math.floor(firstDayPosition / 7)][firstDayPosition % 7].format(
          "YYYY-MM-DD"
        )
      ).toBe("2021-05-01");

      // Check the last day of the matrix is in June
      const lastRow = matrix[matrix.length - 1];
      const lastDay = lastRow[lastRow.length - 1];
      expect(lastDay.isAfter(month.endOf("month"))).toBe(true);
    });
  });

  // Testing getIsWeekend
  describe("getIsWeekend", () => {
    it("identifies weekends correctly", () => {
      const saturday = dayjs("2021-05-01"); // A known Saturday
      const sunday = dayjs("2021-05-02"); // A known Sunday
      const weekday = dayjs("2021-04-30"); // A known weekday (Friday)

      expect(getIsWeekend(saturday)).toBe(true);
      expect(getIsWeekend(sunday)).toBe(true);
      expect(getIsWeekend(weekday)).toBe(false);
    });
  });

  describe("isWithinRange", () => {
    it("correctly identifies if a day is within a given range", () => {
      const start = dayjs("2021-05-01");
      const end = dayjs("2021-05-07");
      const within = dayjs("2021-05-03");
      const outside = dayjs("2021-05-10");

      expect(isWithinRange(within, start, end)).toBe(true);
      expect(isWithinRange(outside, start, end)).toBe(false);
    });
  });

  // Testing addBusinessDays
  describe("addBusinessDays", () => {
    it("correctly adds business days to a date", () => {
      const start = dayjs("2021-05-06"); // Thursday
      expect(addBusinessDays(start, 2).format("YYYY-MM-DD")).toBe("2021-05-10"); // Should skip weekend
    });
  });

  // Testing subtractBusinessDays
  describe("subtractBusinessDays", () => {
    it("correctly subtracts business days from a date", () => {
      const start = dayjs("2021-05-03"); // Monday
      expect(subtractBusinessDays(start, 1).format("YYYY-MM-DD")).toBe(
        "2021-04-30"
      ); // Previous Friday
    });
  });

  describe("calculateActiveButtonType", () => {
    it("returns the correct RangeType for Last 7-day range", () => {
      const today = dayjs("2024-01-15");
      const selectedRange = {
        start: today.subtract(10, "days"),
        end: today,
      };
      expect(calculateActiveButtonType(selectedRange)).toBe(RangeType.Last7D);
    });

    it("returns the correct RangeType for next 30-day range", () => {
      const today = dayjs("2024-01-15");
      const selectedRange = {
        start: today,
        end: today.add(39, "days"),
      };
      expect(calculateActiveButtonType(selectedRange)).toBe(RangeType._30D);
    });

    it('returns "" for ranges not matching predefined types', () => {
      const selectedRange = {
        start: dayjs("2021-05-01"),
        end: dayjs("2021-05-05"),
      };
      expect(calculateActiveButtonType(selectedRange)).toBe("");
    });
  });

  describe("setRangeBasedOnType", () => {
    it("correctly sets the range for Last7D", () => {
      const { start, end } = setRangeBasedOnType(RangeType.Last7D);
      const today = getCurrentDay();
      const expectedStart = subtractBusinessDays(today, 6);

      expect(start.format("YYYY-MM-DD")).toBe(
        expectedStart.format("YYYY-MM-DD")
      );
      expect(end.format("YYYY-MM-DD")).toBe(today.format("YYYY-MM-DD"));
    });

    it("correctly sets the range for Last30D", () => {
      const { start, end } = setRangeBasedOnType(RangeType.Last30D);
      const today = getCurrentDay();
      const expectedStart = subtractBusinessDays(today, 29);

      expect(start.format("YYYY-MM-DD")).toBe(
        expectedStart.format("YYYY-MM-DD")
      );
      expect(end.format("YYYY-MM-DD")).toBe(today.format("YYYY-MM-DD"));
    });

    it("correctly sets the range for _7D", () => {
      const { start, end } = setRangeBasedOnType(RangeType._7D);
      const today = getCurrentDay();
      const expectedEnd = addBusinessDays(today, 6);
      expect(start.format("YYYY-MM-DD")).toBe(today.format("YYYY-MM-DD"));
      expect(end.format("YYYY-MM-DD")).toBe(expectedEnd.format("YYYY-MM-DD"));
    });

    it("correctly sets the range for _30D", () => {
      const { start, end } = setRangeBasedOnType(RangeType._30D);
      const today = getCurrentDay();
      const expectedEnd = addBusinessDays(today, 29);

      expect(start.format("YYYY-MM-DD")).toBe(today.format("YYYY-MM-DD"));
      expect(end.format("YYYY-MM-DD")).toBe(expectedEnd.format("YYYY-MM-DD"));
    });
  });

  // Testing findWeekendDatesInRange
  describe("findWeekendDatesInRange", () => {
    it("identifies weekends correctly within a range", () => {
      const start = dayjs("2021-04-26"); // Monday
      const end = dayjs("2021-05-02"); // Sunday

      const weekends = findWeekendDatesInRange(start, end);
      expect(weekends.length).toBe(2);
      expect(getIsWeekend(weekends[0])).toBe(true);
      expect(getIsWeekend(weekends[1])).toBe(true);
      expect(weekends[0].format("YYYY-MM-DD")).toBe("2021-05-01"); // Saturday
      expect(weekends[1].format("YYYY-MM-DD")).toBe("2021-05-02"); // Sunday
    });

    it("handles ranges without weekends", () => {
      const start = dayjs("2021-04-26"); // Monday
      const end = dayjs("2021-04-28"); // Wednesday

      const weekends = findWeekendDatesInRange(start, end);
      expect(weekends.length).toBe(0);
    });

    it("handles single-day range on a weekend", () => {
      const start = dayjs("2021-05-01"); // Saturday
      const end = dayjs("2021-05-01"); // Saturday

      const weekends = findWeekendDatesInRange(start, end);
      expect(weekends.length).toBe(1);
      expect(getIsWeekend(weekends[0])).toBe(true);
      expect(weekends[0].format("YYYY-MM-DD")).toBe("2021-05-01"); // Saturday
    });

    it("handles single-day range on a weekday", () => {
      const start = dayjs("2021-04-28"); // Wednesday
      const end = dayjs("2021-04-28"); // Wednesday

      const weekends = findWeekendDatesInRange(start, end);
      expect(weekends.length).toBe(0);
    });
  });
});
