import { gapBetweenElements } from '@/consts/spacing/gaps'
import { MealCreate, SavedMeal } from '@/types/meal.type'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppCard } from '../shared/AppCard'
import { AppText } from '../shared/text/AppText'

type PropsType = {
    savedMeal: SavedMeal,
    addMealFn: (newMeal: MealCreate) => void
}
export default function SingleSavedMeal({ savedMeal, addMealFn }: PropsType) {
    function handleAdd(saved: SavedMeal) {
        const mealCreate: MealCreate = (({ id, ...rest }) => rest)(saved);
        addMealFn(mealCreate)
    }

    return (
        <AppCard style={styles.container} darkBg>
            <View style={styles.containerMain}>
                <View style={styles.containerData}>
                    <AppText variant='medium'>
                        {savedMeal.name}
                    </AppText>
                    <AppText>|</AppText>
                    <AppText variant='medium'>
                        {savedMeal.kcal} Kcal
                    </AppText>
                </View>

                <View style={styles.containerDetails}>
                    <AppText>
                        Protein {savedMeal.protein}g
                    </AppText>
                    <AppText>
                        Carbs {savedMeal.carbs}g
                    </AppText>
                    <AppText>
                        Fat {savedMeal.fat}g
                    </AppText>
                </View>
            </View>


            <TouchableOpacity onPress={() => handleAdd(savedMeal)}>
                <Ionicons name="add-circle" size={32}></Ionicons>
            </TouchableOpacity>
        </AppCard>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerMain: {
        flexDirection: 'column',
        gap: gapBetweenElements
    },
    containerData: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 6
    },
    containerDetails: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 16
    },
    containerDate: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
