import { Meal } from "@/types/meal.type"
import { db } from "../database"

export const getAllMeals = (): Meal[] => {
    return db.getAllSync('SELECT * FROM meals;', [])
}