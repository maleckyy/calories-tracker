
import { User } from "@/types/user.type";
import { db, userId } from "../../database";

export const getUserData = (): User | null => {
    try {
        const user = db.getFirstSync<User>(
            'SELECT * FROM user WHERE id = ?',
            [userId]
        );
        return user || null;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};