import { gapBetweenSection } from '@/consts/spacing/gaps'
import { deleteMeal } from '@/db/actions/meals/deleteMealById'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { Meal } from '@/types/meal.type'
import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppCard } from '../shared/AppCard'
import { AppText } from '../shared/text/AppText'
import SingleMealItem from './SingleMealItem'

export default function LastMeals({ meals }: { meals: Meal[] }) {
    const { removeMeal } = useMealStore()
    const router = useRouter()

    const deleteMealById = useCallback((id: string) => {
        const res = deleteMeal(id)
        if (res === true) {
            removeMeal(id)
        }
    }, [removeMeal])

    return (
        <AppCard>
            <View style={styles.container}>
                <View style={styles.sectionWrapper}>
                    <AppText variant='large'>{`Today's meals`}</AppText>
                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => router.replace('/all-meals')}>
                        <AppText variant='base' bold>See all</AppText>
                    </TouchableOpacity>
                </View>
                {meals.length > 0 && meals.map(m => <SingleMealItem meal={m} key={m.id} deleteFn={deleteMealById} />)}
                {meals.length === 0 && <AppText>No meals today ;(</AppText>}
            </View>
        </AppCard>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: gapBetweenSection
    },
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