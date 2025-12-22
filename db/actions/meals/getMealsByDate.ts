import { Meal } from "@/types/meal.type"
import { db } from "../../database"

export const getMealsByDate = (date: string): Meal[] => {
    return db.getAllSync('SELECT * FROM meals WHERE date = ?;', [date])
}