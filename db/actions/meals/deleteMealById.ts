import { db } from "../../database";

export const deleteMeal = (id: string): boolean => {
    try {
        const result = db.runSync(
            'DELETE FROM meals WHERE id = ?',
            [id]
        );
        return true;
    } catch (error) {
        console.error("Błąd bazy danych:", error);
        return false;
    }
}