import { GoalType } from "@/types/user.type";
import { getUserGoal } from "./getUserGoal";

describe("getUserGoal", () => {
    it("should return “Weight loss” for the key 'loseWeight'", () => {
        expect(getUserGoal('loseWeight')).toBe('Weight loss')
    });

    it("should return “Maintenance” for the key 'maintain'", () => {
        expect(getUserGoal('maintain')).toBe('Maintenance')
    });

    it("should return “Weight gain” for the key 'gainMuscle'", () => {
        expect(getUserGoal('gainMuscle')).toBe('Weight gain')
    });

    it("should return “Weight gain” as the default value", () => {
        expect(getUserGoal('gainMuscle' as GoalType)).toBe('Weight gain')
    });
});