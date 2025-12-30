import { formatTime } from "./formatTime";

describe("formatTime", () => {
    it("should format a Date object correctly", () => {
        const date = new Date(2025, 10, 25, 14, 30)
        expect(formatTime(date)).toBe("14:30")
    });

    it("should format an ISO string correctly", () => {
        const isoString = "2025-10-25T09:05:00Z"
        const result = formatTime(isoString)
        expect(result).toMatch(/^\d{2}:\d{2}$/)
    });

    it("should pad hours and minutes with leading zeros", () => {
        const date = new Date(2025, 10, 25, 7, 5)
        expect(formatTime(date)).toBe("07:05")
    });

    it("should return '00:00' for invalid date strings", () => {
        expect(formatTime("not-a-date")).toBe("00:00")
    });

    it("should return '00:00' for an invalid Date object", () => {
        const invalidDate = new Date("invalid")
        expect(formatTime(invalidDate)).toBe("00:00")
    });

    it("should handle midnight correctly", () => {
        const date = new Date(2025, 10, 25, 0, 0)
        expect(formatTime(date)).toBe("00:00")
    });
});