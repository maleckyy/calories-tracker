import { addMeal } from '@/db/actions/meals/createMeal'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { useSavedMealsStore } from '@/stores/saved-meals/useSavedMealsStore'
import { MealCreate } from '@/types/meal.type'
import { showToast } from '@/utils/toasts/showToast'
import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AppCard } from '../shared/AppCard'
import SeeMoreButton from '../shared/buttons/SeeMoreButton'
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
        showToast('success', 'Meal added correctly')
    }

    return (
        <AppCard>
            <View style={styles.sectionWrapper}>
                <AppText variant='large'>Recently saved</AppText>
                <SeeMoreButton text='See all' onPress={() => router.push('/all-saved-meals')} />
            </View>
            {savedMeals.length > 0 && savedMeals.slice(0, limit).map(sm => <SingleSavedMeal key={sm.id} savedMeal={sm} addMealFn={addSavedMeal} />)}
            {savedMeals.length === 0 && <AppText variant='medium'>No meals saved</AppText>}
        </AppCard>
    )
}

const styles = StyleSheet.create({
    sectionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        paddingBlock: 4,
        paddingInline: 8,
        borderWidth: 1,
        borderRadius: 10,
    }
})
