import { deleteMeal } from '@/db/actions/meals/deleteMealById'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { Meal } from '@/types/meal.type'
import { showToast } from '@/utils/toasts/showToast'
import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppCard } from '../shared/AppCard'
import SeeMoreButton from '../shared/buttons/SeeMoreButton'
import { AppText } from '../shared/text/AppText'
import SingleMealItem from './SingleMealItem'

export default function LastMeals({ meals }: { meals: Meal[] }) {
    const { removeMeal } = useMealStore()
    const router = useRouter()

    const deleteMealById = useCallback((id: string) => {
        const res = deleteMeal(id)
        if (res === true) {
            removeMeal(id)
            showToast('success', 'Meal deleted')
        }
    }, [removeMeal])

    return (
        <AppCard>
            <View style={styles.sectionWrapper}>
                <AppText variant='large'>{`Today's meals`}</AppText>
                <SeeMoreButton text='See all' onPress={() => router.push('/all-meals')} />
            </View>
            {meals.length > 0 && meals.map(m => <SingleMealItem meal={m} key={m.id} deleteFn={deleteMealById} />)}
            {meals.length === 0 && <AppText>No meals today ;(</AppText>}
        </AppCard>
    )
}

const styles = StyleSheet.create({
    sectionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})