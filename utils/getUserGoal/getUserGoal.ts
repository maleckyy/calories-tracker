import { GoalType } from "@/types/user.type"

export function getUserGoal(name: GoalType) {
    switch (name) {
        case 'loseWeight':
            return 'Weight loss'
        case 'maintain':
            return 'Maintenance'
        default:
            return 'Weight gain'
    }
}