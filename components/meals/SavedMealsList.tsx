import { addMeal } from '@/db/actions/meals/createMeal'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { useSavedMealsStore } from '@/stores/saved-meals/useSavedMealsStore'
import { MealCreate } from '@/types/meal.type'
import React from 'react'
import { AppCard } from '../shared/AppCard'
import { AppText } from '../shared/text/AppText'
import SingleSavedMeal from './SingleSavedMeal'

type PropsType = {
    limit?: number
}

export default function SavedMealsList({ limit = 5 }: PropsType) {
    const savedMeals = useSavedMealsStore(state => state.savedMeals)
    const { addMeal: addMealToStore } = useMealStore()

    function addSavedMeal(newMeal: MealCreate) {
        const createdMeal = addMeal(newMeal);
        addMealToStore(createdMeal)
    }

    return (
        <AppCard>
            <AppText variant='large'>Recently saved</AppText>
            {savedMeals.length > 0 && savedMeals.slice(0, limit).map(sm => <SingleSavedMeal key={sm.id} savedMeal={sm} addMealFn={addSavedMeal} />)}
        </AppCard>
    )
}
