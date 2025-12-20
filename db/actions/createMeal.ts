import { Meal, MealCreate } from "@/types/meal.type";
import { getId } from "@/utils/getId";
import { db } from "../database";

export const addMeal = (meal: MealCreate): Meal => {
    const id = getId();
    const newMeal: Meal = { ...meal, id, date: new Date().toISOString() };

    db.runSync(
        `INSERT INTO meals (id, name, kcal, date, protein, carbs, fat) 
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [
            newMeal.id,
            newMeal.name,
            newMeal.kcal,
            newMeal.date,
            newMeal.protein,
            newMeal.carbs,
            newMeal.fat,
        ]
    );

    return newMeal;
}