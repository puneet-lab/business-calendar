import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import {
  addMonths,
  generateYearRange,
  getCurrentDay,
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
});
