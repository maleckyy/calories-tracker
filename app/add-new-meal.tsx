import MealForm from '@/components/meal-form/MealForm'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import ScreenHeader from '@/components/shared/ScreenHeader'
import { addMeal } from '@/db/actions/meals/createMeal'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { MealCreate } from '@/types/meal.type'
import { showToast } from '@/utils/toasts/showToast'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AddNewMeal() {
    const { addMeal: addMealToStore } = useMealStore()
    const insets = useSafeAreaInsets();

    function addMealToDb(data: MealCreate) {
        const newMeal = addMeal(data);
        addMealToStore(newMeal)
        showToast('success', 'Meal added correctly')
    }

    return (
        <AppSafeView paddingBottom={insets.bottom} buttonsBackground>
            <AppContainer>
                <ScreenHeader title='Add meal' backHref={'/(tabs)/meals'} />
                <MealForm onSubmit={addMealToDb} />
            </AppContainer>
        </AppSafeView>
    )
}
