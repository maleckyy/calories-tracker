import { SavedMeal } from "@/types/meal.type"
import { create } from "zustand"

type SavedMealsStore = {
    savedMeals: SavedMeal[]
    addSavedMeal: (savedMeal: SavedMeal) => void
    removeSavedMeal: (id: string) => void
    setSavedMeals: (savedMeals: SavedMeal[]) => void
}

export const useSavedMealsStore = create<SavedMealsStore>((set) => ({
    savedMeals: [],

    addSavedMeal: (savedMeal) =>
        set((state) => ({
            savedMeals: [
                ...state.savedMeals,
                {
                    ...savedMeal,
                },
            ],
        })),

    removeSavedMeal: (id) =>
        set((state) => ({
            savedMeals: state.savedMeals.filter((sm) => sm.id !== id),
        })),

    setSavedMeals: (savedMeals) => set({ savedMeals }),
}))
