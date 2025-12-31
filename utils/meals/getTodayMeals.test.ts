import { Meal } from "@/types/meal.type"
import { getTodayMeals } from "./getTodayMeals"

describe("getTodayMeals tests", () => {
    const mockToday = "2025-12-30"

    beforeAll(() => {
        jest.useFakeTimers()
        jest.setSystemTime(new Date(mockToday))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it("should return only meals recorded today", () => {
        const meals: Meal[] = [
            {
                id: "1",
                name: "Breakfast",
                kcal: 400, protein: 20, carbs: 40, fat: 10,
                date: "2025-12-30T07:00:00Z"
            },
            {
                id: "2",
                name: "Lunch",
                kcal: 700, protein: 40, carbs: 60, fat: 20,
                date: "2025-12-30T13:00:00Z"
            },
            {
                id: "3",
                name: "Dinner",
                kcal: 500, protein: 30, carbs: 30, fat: 15,
                date: "2025-12-29T19:00:00Z"
            }
        ]

        const result = getTodayMeals(meals)

        expect(result).toHaveLength(2)
        expect(result[0].name).toBe("Breakfast")
        expect(result[1].name).toBe("Lunch")
        expect(result.find(m => m.id === "3")).toBeUndefined()
    })

    it("should return an empty array when no meals match today's date", () => {
        const meals: Meal[] = [
            {
                id: "4",
                name: "Old Meal",
                kcal: 100, protein: 0, carbs: 0, fat: 0,
                date: "1990-01-01T12:00:00Z"
            }
        ]

        const result = getTodayMeals(meals)
        expect(result).toEqual([])
    })

    it("should handle an empty meal list gracefully", () => {
        expect(getTodayMeals([])).toEqual([])
    })

    it("should match meals regardless of the time within the ISO string", () => {
        const lateNightMeal: Meal = {
            id: "5",
            name: "Midnight Snack",
            kcal: 200, protein: 5, carbs: 10, fat: 5,
            date: `${mockToday}T23:59:59.999Z`
        }

        const result = getTodayMeals([lateNightMeal])
        expect(result).toHaveLength(1)
        expect(result[0].id).toBe("5")
    })
})