import { db } from "../../database";

export const clearOldHydration = () => {
    return db.runSync(
        "DELETE FROM hydration WHERE date(date) < date('now', '-30 days');",
        []
    );
}