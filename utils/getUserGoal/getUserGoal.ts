import { GoalType } from "@/types/user.type"

export function getUserGoal(name: GoalType) {
    switch (name) {
        case 'loseWeight':
            return 'Weight loss'
        case 'maintain':
            return 'Maintence '
        default:
            return 'Weight gain'
    }
}