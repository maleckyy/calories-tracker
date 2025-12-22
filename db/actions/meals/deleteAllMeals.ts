import { db } from "../../database"

export const clearAllMeals = () => {
    db.runSync('DELETE FROM meals;', [])
}