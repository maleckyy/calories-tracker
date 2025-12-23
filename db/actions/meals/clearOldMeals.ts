import { db } from "../../database";

export const clearOldMeals = () => {
    return db.runSync(
        "DELETE FROM meals WHERE date(date) < date('now', '-30 days');",
        []
    );
}