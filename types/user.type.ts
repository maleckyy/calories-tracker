export type GenderType = 'male' | 'female' | 'other'

export type GoalType = 'loseWeight' | 'maintain' | 'gainMuscle'

export type User = {
    username: string
    birthDate: string

    calorieRequirement: number
    proteinRequirement: number
    carbsRequirement: number
    fatRequirement: number

    waterGoal: number

    gender: GenderType
    weight: number
    height: number
    goal: GoalType
}