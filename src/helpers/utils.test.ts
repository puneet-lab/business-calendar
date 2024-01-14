import dayjs from "dayjs";
import { describe, expect, it } from "vitest";
import { getCurrentDay } from "./utils";

describe("Utility functions", () => {
  describe("getCurrentDay", () => {
    it("returns the current day", () => {
      const today = new Date();
      const currentDay = getCurrentDay();
      expect(currentDay.format("YYYY-MM-DD")).toBe(
        dayjs(today).format("YYYY-MM-DD")
      );
    });
  });
});
