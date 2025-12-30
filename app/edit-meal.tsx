import MealForm from '@/components/meal-form/MealForm'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import ScreenHeader from '@/components/shared/ScreenHeader'
import { updateMeal } from '@/db/actions/meals/updateMeal'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { Meal, MealCreate } from '@/types/meal.type'
import { showToast } from '@/utils/toasts/showToast'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
export default function EditMealScreen() {
    const router = useRouter()
    const { id } = useLocalSearchParams()
    const insets = useSafeAreaInsets();

    const { meals, updateMeal: updateMealToStore } = useMealStore()
    const meal = meals.find(m => m.id === id)

    function updateMealToDb(data: Meal | MealCreate) {
        const updatedMeal = updateMeal(data as Meal)
        if (updatedMeal) {
            updateMealToStore(updatedMeal)
            showToast('success', 'Meal updated')
        }
    };
    if (!meal) {
        router.replace('/(tabs)')
    }

    return (
        <AppSafeView paddingBottom={insets.bottom} buttonsBackground>
            <AppContainer>
                <ScreenHeader title='Edit meal' backHref={'/(tabs)'} />
                <MealForm onSubmit={updateMealToDb} initialData={meal} />
            </AppContainer>
        </AppSafeView>
    )
}