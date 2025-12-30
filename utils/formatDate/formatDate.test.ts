import { formatDate } from "./formatDate";

describe("formatDate", () => {
    it("should format an ISO date string to Polish date format", () => {
        const input = "2025-12-30T10:00:00Z"
        const result = formatDate(input)
        expect(result).toBe("30.12.2025")
    });

    it("should correctly pad single digit days and months", () => {
        const input = "2025-01-05T10:00:00Z"
        const result = formatDate(input)
        expect(result).toBe("05.01.2025")
    });

    it("should handle different valid date string formats", () => {
        const input = "2025-08-15"
        const result = formatDate(input)
        expect(result).toBe("15.08.2025")
    });

    it("should return 'Invalid Date' string if the input is garbage", () => {
        const result = formatDate("not-a-date")
        expect(result).toBe("Invalid Date")
    });
});