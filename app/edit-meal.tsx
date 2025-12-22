import MealForm from '@/components/meal-form/MealForm'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import ScreenHeader from '@/components/shared/ScreenHeader'
import { updateMeal } from '@/db/actions/meals/updateMeal'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { Meal, MealCreate } from '@/types/meal.type'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
export default function EditMealScreen() {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const { meals, updateMeal: updateMealToStore } = useMealStore()
    const meal = meals.find(m => m.id === id)

    function updateMealToDb(data: Meal | MealCreate) {
        const updatedMeal = updateMeal(data as Meal)
        if (updatedMeal) {
            updateMealToStore(updatedMeal)
        }
    };
    if (!meal) {
        router.replace('/(tabs)')
    }

    return (
        <AppSafeView>
            <AppContainer>
                <ScreenHeader title='Edit meal' backHref={'/(tabs)'} />
                <MealForm onSubmit={updateMealToDb} initialData={meal} />
            </AppContainer>
        </AppSafeView>
    )
}