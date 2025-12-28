import { gapBetweenSection } from '@/consts/spacing/gaps';
import { addMeal } from '@/db/actions/meals/createMeal';
import { deleteSavedMeal } from '@/db/actions/saved-meals/deleteSavedMeal';
import { useMealStore } from '@/stores/meals/useMealsStore';
import { useSavedMealsStore } from '@/stores/saved-meals/useSavedMealsStore';
import { MealCreate } from '@/types/meal.type';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../shared/text/AppText';
import SavedMealListElement from './SavedMealListElement';

export default function AllSavedMealsList() {
    const { savedMeals, removeSavedMeal } = useSavedMealsStore()
    const { addMeal: addMealToStore } = useMealStore()
    const router = useRouter()

    function addSavedMeal(newMeal: MealCreate) {
        const createdMeal = addMeal(newMeal);
        addMealToStore(createdMeal)
        if (createdMeal) router.replace('/(tabs)')
    }
    const deleteSavedMealById = useCallback((id: string) => {
        const res = deleteSavedMeal(id)
        if (res === true) {
            removeSavedMeal(id)
        }
    }, [removeSavedMeal])

    return (
        <View style={styles.container}>
            {savedMeals.length > 0 && savedMeals.map(sm => <SavedMealListElement key={sm.id} savedMeal={sm} addMealFn={addSavedMeal} deleteFn={deleteSavedMealById} />)}
            {savedMeals.length === 0 && <AppText variant='medium' style={{ textAlign: 'center' }}>No meals saved</AppText>}
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