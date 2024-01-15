import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import {
  addMonths,
  generateMonthMatrix,
  generateYearRange,
  getCurrentDay,
  getIsWeekend,
  isWithinRange,
  setMonth,
  setYear,
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
});
