import { MealCreate, SavedMeal } from "@/types/meal.type";
import { getId } from "@/utils/getId";
import { db } from "../../database";

export const saveMeal = (meal: MealCreate): SavedMeal => {
    const id = getId();
    const newMeal: SavedMeal = { id, ...meal };

    db.runSync(
        `INSERT INTO saved_meals (id, name, kcal, protein, carbs, fat) 
         VALUES (?, ?, ?, ?, ?, ?);`,
        [
            newMeal.id,
            newMeal.name,
            newMeal.kcal,
            newMeal.protein,
            newMeal.carbs,
            newMeal.fat,
        ]
    );

    return newMeal;
}