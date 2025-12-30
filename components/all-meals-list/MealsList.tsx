import { deleteMeal } from '@/db/actions/meals/deleteMealById';
import { useMealStore } from '@/stores/meals/useMealsStore';
import { Meal, MealGroup } from '@/types/meal.type';
import { formatDate } from '@/utils/formatDate/formatDate';
import { showToast } from '@/utils/toasts/showToast';
import React, { useCallback } from 'react';
import SingleMealItem from '../dashboard-components/SingleMealItem';
import { AppCard } from '../shared/AppCard';
import { AppText } from '../shared/text/AppText';

export default function MealsList() {
    const meals = useMealStore(state => state.meals)
    const sortedMeals = [...meals].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    const { removeMeal } = useMealStore()

    const groupedMeals: MealGroup[] = React.useMemo(() => {
        const groups = sortedMeals.reduce((acc, meal) => {
            const dayKey = new Date(meal.date).toISOString().split('T')[0];

            if (!acc[dayKey]) {
                acc[dayKey] = [];
            }
            acc[dayKey].push(meal);
            return acc;
        }, {} as Record<string, Meal[]>);

        return Object.entries(groups)
            .map(([day, meals]) => ({
                day,
                meals: meals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            }))
            .sort((a, b) => new Date(b.day).getTime() - new Date(a.day).getTime());
    }, [sortedMeals]);

    const deleteMealById = useCallback((id: string) => {
        const res = deleteMeal(id)
        if (res === true) {
            removeMeal(id)
            showToast('success', 'Meal deleted')
        }
    }, [removeMeal])

    return (
        <>
            {groupedMeals && groupedMeals.map(g => {
                return (
                    <AppCard key={g.day}>
                        <AppText variant='large'>{formatDate(g.day)}</AppText>
                        {g && g.meals.map(m => <SingleMealItem meal={m} key={m.id} deleteFn={deleteMealById} showDate />)}
                    </AppCard>
                )
            })}
        </>
    )
}
