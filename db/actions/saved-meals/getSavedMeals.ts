import { SavedMeal } from "@/types/meal.type"
import { db } from "../../database"

export const getSavedMeals = (): SavedMeal[] => {
    return db.getAllSync('SELECT * FROM saved_meals;', [])
}