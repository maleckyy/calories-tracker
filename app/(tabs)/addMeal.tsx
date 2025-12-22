import MealForm from '@/components/meal-form/MealForm'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import ScreenHeader from '@/components/shared/ScreenHeader'
import { addMeal } from '@/db/actions/meals/createMeal'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { MealCreate } from '@/types/meal.type'
import React from 'react'
export default function AddMealScreen() {
    const { addMeal: addMealToStore } = useMealStore()

    function addMealToDb(data: MealCreate) {
        const newMeal = addMeal(data);
        addMealToStore(newMeal)
    };

    return (
        <AppSafeView>
            <AppContainer>
                <ScreenHeader title='Add meal' />
                <MealForm onSubmit={addMealToDb} />
            </AppContainer>
        </AppSafeView>
    )
}