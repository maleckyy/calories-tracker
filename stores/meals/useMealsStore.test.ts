import { Meal } from "@/types/meal.type"
import { act } from "@testing-library/react-native"
import { useMealStore } from "./useMealsStore"

describe("useMealStore", () => {
    const mockMeal: Meal = {
        id: "m1",
        date: "2025-12-30T10:00:00Z",
        name: "Breakfast",
        kcal: 400,
        protein: 20,
        carbs: 50,
        fat: 10,
    }

    beforeEach(() => {
        act(() => {
            useMealStore.getState().setMeals([])
        })
    })

    it("should initialize with an empty array", () => {
        expect(useMealStore.getState().meals).toEqual([])
    })

    it("should add a meal correctly", () => {
        act(() => {
            useMealStore.getState().addMeal(mockMeal)
        })

        const state = useMealStore.getState()
        expect(state.meals).toHaveLength(1)
        expect(state.meals[0]).toEqual(mockMeal)
    })

    it("should remove a meal by ID", () => {
        act(() => {
            useMealStore.getState().setMeals([
                mockMeal,
                { ...mockMeal, id: "m2", name: "Lunch" }
            ])
        })

        act(() => {
            useMealStore.getState().removeMeal("m1")
        })

        const state = useMealStore.getState()
        expect(state.meals).toHaveLength(1)
        expect(state.meals[0].id).toBe("m2")
    })

    it("should update an existing meal", () => {
        act(() => {
            useMealStore.getState().addMeal(mockMeal)
        })

        const updatedMeal: Meal = {
            ...mockMeal,
            name: "Updated Breakfast",
            kcal: 600
        }

        act(() => {
            useMealStore.getState().updateMeal(updatedMeal)
        })

        const state = useMealStore.getState()
        expect(state.meals[0].name).toBe("Updated Breakfast")
        expect(state.meals[0].kcal).toBe(600)
        expect(state.meals[0].id).toBe("m1")
    })

    it("should not change anything when updating a non-existent ID", () => {
        act(() => {
            useMealStore.getState().addMeal(mockMeal)
        })

        const ghostMeal: Meal = { ...mockMeal, id: "non-existent" }

        act(() => {
            useMealStore.getState().updateMeal(ghostMeal)
        })

        const state = useMealStore.getState()
        expect(state.meals).toHaveLength(1)
        expect(state.meals[0].id).toBe("m1")
    })

    it("should overwrite state with setMeals", () => {
        const mealsArray: Meal[] = [mockMeal, { ...mockMeal, id: "m2" }]

        act(() => {
            useMealStore.getState().setMeals(mealsArray)
        })

        expect(useMealStore.getState().meals).toEqual(mealsArray)
    })
})