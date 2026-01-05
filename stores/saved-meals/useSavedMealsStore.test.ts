import { SavedMeal } from "@/types/meal.type"
import { act } from "@testing-library/react-native"
import { useSavedMealsStore } from "./useSavedMealsStore"

describe("useSavedMealsStore", () => {
    const mockSavedMeal: SavedMeal = {
        id: "meal-123",
        name: "Chicken and Rice",
        kcal: 500,
        protein: 40,
        carbs: 60,
        fat: 10,
    }

    beforeEach(() => {
        act(() => {
            useSavedMealsStore.getState().setSavedMeals([])
        })
    })

    it("should initialize with an empty savedMeals array", () => {
        expect(useSavedMealsStore.getState().savedMeals).toEqual([])
    })

    it("should add a saved meal to the list", () => {
        act(() => {
            useSavedMealsStore.getState().addSavedMeal(mockSavedMeal)
        })

        const state = useSavedMealsStore.getState()
        expect(state.savedMeals).toHaveLength(1)
        expect(state.savedMeals[0]).toEqual(mockSavedMeal)
        expect(state.savedMeals[0].name).toBe("Chicken and Rice")
    })

    it("should remove a saved meal by id", () => {
        act(() => {
            useSavedMealsStore.getState().setSavedMeals([
                mockSavedMeal,
                { ...mockSavedMeal, id: "meal-456", name: "Oatmeal" }
            ])
        })

        act(() => {
            useSavedMealsStore.getState().removeSavedMeal("meal-123")
        })

        const state = useSavedMealsStore.getState()
        expect(state.savedMeals).toHaveLength(1)
        expect(state.savedMeals[0].id).toBe("meal-456")
        expect(state.savedMeals.find(m => m.id === "meal-123")).toBeUndefined()
    })

    it("should overwrite the entire list", () => {
        const newList: SavedMeal[] = [
            { id: "1", name: "Salad", kcal: 200, protein: 5, carbs: 10, fat: 15 },
            { id: "2", name: "Shake", kcal: 300, protein: 30, carbs: 20, fat: 5 }
        ]

        act(() => {
            useSavedMealsStore.getState().setSavedMeals(newList)
        })

        expect(useSavedMealsStore.getState().savedMeals).toEqual(newList)
        expect(useSavedMealsStore.getState().savedMeals.length).toBe(2)
    })

    it("should maintain other properties when adding a meal", () => {
        act(() => {
            useSavedMealsStore.getState().addSavedMeal(mockSavedMeal)
        })

        const addedMeal = useSavedMealsStore.getState().savedMeals[0]
        expect(addedMeal.kcal).toBe(500)
        expect(addedMeal.protein).toBe(40)
    })
})