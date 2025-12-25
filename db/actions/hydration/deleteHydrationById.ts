import { db } from "../../database";

export const deleteHydrationById = (id: string): boolean => {
    try {
        const result = db.runSync(
            'DELETE FROM hydration WHERE id = ?',
            [id]
        );
        return result.changes > 0;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}