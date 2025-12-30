import { getId } from "./getId";

describe("getId", () => {
    const mockDate = "2025-12-30T12:00:00.000Z"

    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date(mockDate))
    });

    afterAll(() => {
        jest.useRealTimers()
    });

    it("should return a string starting with the current ISO date", () => {
        const result = getId()
        expect(result.startsWith(mockDate)).toBe(true)
    });

    it("should return a unique string even when called at the same time", () => {
        const mockRandomValue = 0.123456789
        jest.spyOn(Math, "random").mockReturnValue(mockRandomValue)

        const result = getId();
        expect(result).toBe(`${mockDate}${mockRandomValue}`)

        jest.spyOn(Math, "random").mockRestore()
    });

    it("should produce different values on subsequent calls due to randomness", () => {
        const id1 = getId()
        const id2 = getId()
        expect(id1).not.toBe(id2)
    });

    it("should return a string type", () => {
        expect(typeof getId()).toBe("string")
    });
});