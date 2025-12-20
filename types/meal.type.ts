export type MealCreate = {
    name: string
    kcal: number
    protein: number
    carbs: number
    fat: number
}

export type Meal = {
    id: string
    date: string
} & MealCreate