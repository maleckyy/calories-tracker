import { deleteMeal } from '@/db/actions/meals/deleteMealById'
import { useMealStore } from '@/stores/meals/useMealsStore'
import React, { useCallback } from 'react'
import SingleMealItem from '../dashboard-components/SingleMealItem'
import { AppCard } from '../shared/AppCard'
import { AppText } from '../shared/text/AppText'

export default function RecentlyAddedMeals() {
    const { meals, removeMeal } = useMealStore()

    const sortedMeals = meals.slice().sort((a, b) => b.date.localeCompare(a.date));

    const deleteMealById = useCallback((id: string) => {
        const res = deleteMeal(id)
        if (res === true) {
            removeMeal(id)
        }
    }, [removeMeal])

    return (
        <AppCard>
            <AppText variant='large'>Recently added</AppText>
            {sortedMeals.length > 0 && sortedMeals.slice(0, 5).map(m => <SingleMealItem key={m.id} meal={m} deleteFn={deleteMealById} />)}
        </AppCard>
    )
}
