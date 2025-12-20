import { db, userId } from "@/db/database";
import { User } from "@/types/user.type";

export const updateUser = (updatedUser: User): User | null => {
    try {
        db.runSync(`
            UPDATE user SET 
                username = ?, 
                birthDate = ?, 
                calorieRequirement = ?, 
                proteinRequirement = ?, 
                carbsRequirement = ?, 
                fatRequirement = ?, 
                waterGoal = ?, 
                gender = ?, 
                weight = ?, 
                height = ?, 
                goal = ?
            WHERE id = ?;
        `, [
            updatedUser.username,
            updatedUser.birthDate,
            updatedUser.calorieRequirement,
            updatedUser.proteinRequirement,
            updatedUser.carbsRequirement,
            updatedUser.fatRequirement,
            updatedUser.waterGoal,
            updatedUser.gender,
            updatedUser.weight,
            updatedUser.height,
            updatedUser.goal,
            userId
        ]);

        return updatedUser;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};