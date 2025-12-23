import { gapBetweenSection } from '@/consts/spacing/gaps';
import { deleteMeal } from '@/db/actions/meals/deleteMealById';
import { useMealStore } from '@/stores/meals/useMealsStore';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import MealElement from './MealElement';

export default function MealsList() {
    const meals = useMealStore(state => state.meals)
    const { removeMeal } = useMealStore()

    const deleteMealById = useCallback((id: string) => {
        const res = deleteMeal(id)
        if (res === true) {
            removeMeal(id)
        }
    }, [removeMeal])

    return (
        <View style={styles.container}>
            {meals && meals.map(m => <MealElement meal={m} key={m.id} deleteFn={deleteMealById} />)}
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