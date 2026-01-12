import { deleteMeal } from '@/db/actions/meals/deleteMealById'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { showToast } from '@/utils/toasts/showToast'
import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import SingleMealItem from '../dashboard-components/SingleMealItem'
import { AppCard } from '../shared/AppCard'
import SeeMoreButton from '../shared/buttons/SeeMoreButton'
import { AppText } from '../shared/text/AppText'

export default function RecentlyAddedMeals() {
    const { meals, removeMeal } = useMealStore()
    const router = useRouter()
    const sortedMeals = meals.slice().sort((a, b) => b.date.localeCompare(a.date));

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
                <AppText variant='large'>Recently added</AppText>
                <SeeMoreButton text='See all' onPress={() => router.push('/all-meals')} />
            </View>
            {sortedMeals.length > 0 && sortedMeals.slice(0, 5).map(m => <SingleMealItem key={m.id} meal={m} deleteFn={deleteMealById} />)}
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
