import { db } from "../../database";

export const deleteSavedMeal = (id: string): boolean => {
    try {
        const result = db.runSync(
            'DELETE FROM saved_meals WHERE id = ?',
            [id]
        );
        return result.changes > 0;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}