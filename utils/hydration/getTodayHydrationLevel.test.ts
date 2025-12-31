import { Hydration } from "@/types/hydration.type"
import { getTodayHydrationLevel } from "./getTodayHydrationLevel"

describe("getTodayHydrationLevel tests", () => {
    const mockToday = "2025-12-30"

    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date(mockToday))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it("should return only hydration entries from today", () => {
        const data: Hydration[] = [
            { id: "1", waterAmount: 250, date: "2025-12-30T08:00:00Z" },
            { id: "2", waterAmount: 500, date: "2025-12-30T14:30:00Z" },
            { id: "3", waterAmount: 250, date: "2025-12-29T20:00:00Z" },
            { id: "4", waterAmount: 300, date: "2026-01-01T10:00:00Z" },
        ]

        const result = getTodayHydrationLevel(data)

        expect(result).toHaveLength(2)
        expect(result).toEqual([
            expect.objectContaining({ id: "1" }),
            expect.objectContaining({ id: "2" }),
        ])
    })

    it("should return an empty array if no entries match today", () => {
        const data: Hydration[] = [
            { id: "1", waterAmount: 200, date: "2024-05-20T12:00:00Z" },
        ]

        const result = getTodayHydrationLevel(data)
        expect(result).toEqual([])
    })

    it("should handle an empty input array", () => {
        expect(getTodayHydrationLevel([])).toEqual([])
    })

    it("should correctly handle entries exactly at the start of the day", () => {
        const data: Hydration[] = [
            { id: "5", waterAmount: 100, date: `${mockToday}T00:00:00.000Z` },
        ]

        const result = getTodayHydrationLevel(data)
        expect(result).toHaveLength(1)
        expect(result[0].id).toBe("5")
    })
})