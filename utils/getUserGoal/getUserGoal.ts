import { GoalType } from "@/types/user.type"

export function getUserGoal(name: GoalType) {
    switch (name) {
        case 'loseWeight':
            return 'Weight loss'
        case 'maintain':
            return 'Weight maintence '
        default:
            return 'Weight gain'
    }
}