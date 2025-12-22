import { Meal } from "@/types/meal.type";
import { db } from "../../database";

export const updateMeal = (updatedMeal: Meal): Meal | null => {
    try {
        db.runSync(
            `UPDATE meals 
             SET name = ?, kcal = ?, protein = ?, carbs = ?, fat = ?, date = ?
             WHERE id = ?;`,
            [
                updatedMeal.name,
                updatedMeal.kcal,
                updatedMeal.protein,
                updatedMeal.carbs,
                updatedMeal.fat,
                updatedMeal.date,
                updatedMeal.id
            ]
        );

        return updatedMeal;
    } catch (error) {
        console.error("Update error:", error);
        return null;
    }
};