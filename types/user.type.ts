export type User = {
    username: string
    birthDate: string

    calorieRequirement: number
    proteinRequirement: number
    carbsRequirement: number
    fatRequirement: number

    waterGoal: number

    gender: 'male' | 'female' | 'other'
    weight: number
    height: number
    goal: 'loseWeight' | 'maintain' | 'gainMuscle'
}