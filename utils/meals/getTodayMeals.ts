import { Meal } from "@/types/meal.type"

export const getTodayMeals = (meals: Meal[]): Meal[] => {
    const today = new Date().toISOString().split("T")[0]

    return meals.filter(meal =>
        meal.date.split("T")[0] === today
    )
}
