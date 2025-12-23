import { gapBetweenSection } from '@/consts/spacing/gaps';
import { deleteMeal } from '@/db/actions/meals/deleteMealById';
import { useMealStore } from '@/stores/meals/useMealsStore';
import { Meal, MealGroup } from '@/types/meal.type';
import { formatDate } from '@/utils/formatDate/formatDate';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../shared/text/AppText';
import MealElement from './MealElement';

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

    console.log(groupedMeals)

    const deleteMealById = useCallback((id: string) => {
        const res = deleteMeal(id)
        if (res === true) {
            removeMeal(id)
        }
    }, [removeMeal])

    return (
        <View style={styles.container}>
            {groupedMeals && groupedMeals.map(g => {
                return (
                    <View key={g.day} style={styles.container}>
                        <AppText style={{ paddingInline: gapBetweenSection }} variant='medium'>{formatDate(g.day)}</AppText>
                        {g && g.meals.map(m => <MealElement meal={m} key={m.id} deleteFn={deleteMealById} />)}
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: "100%",
        gap: gapBetweenSection
    }
})