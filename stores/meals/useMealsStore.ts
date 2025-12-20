import { Meal } from "@/types/meal.type"
import { create } from "zustand"

type MealStore = {
    meals: Meal[]
    addMeal: (meal: Meal) => void
    removeMeal: (id: string) => void
    updateMeal: (meal: Meal) => void
    setMeals: (meals: Meal[]) => void
}

export const useMealStore = create<MealStore>((set) => ({
    meals: [],

    addMeal: (meal) =>
        set((state) => ({
            meals: [
                ...state.meals,
                {
                    ...meal,
                },
            ],
        })),

    removeMeal: (id) =>
        set((state) => ({
            meals: state.meals.filter((m) => m.id !== id),
        })),

    updateMeal: (meal) =>
        set((state) => ({
            meals: state.meals.map((m) =>
                m.id === meal.id ? { ...meal } : m
            ),
        })),

    setMeals: (meals) => set({ meals }),
}))
