import { gapBetweenSection } from '@/consts/spacing/gaps'
import { deleteMeal } from '@/db/actions/meals/deleteMealById'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { Meal } from '@/types/meal.type'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppText } from '../shared/text/AppText'
import SingleMealItem from './SingleMealItem'

export default function LastMeals({ meals }: { meals: Meal[] }) {
    const { removeMeal } = useMealStore()

    const deleteMealById = useCallback((id: string) => {
        const res = deleteMeal(id)
        if (res === true) {
            removeMeal(id)
        }
    }, [removeMeal])

    return (
        <View style={styles.container}>
            <AppText variant='large'>{`Today's meals`}</AppText>
            {meals.length > 0 && meals.map(m => <SingleMealItem meal={m} key={m.id} deleteFn={deleteMealById} />)}
            {meals.length === 0 && <AppText>No meals today ;(</AppText>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: gapBetweenSection
    },
})