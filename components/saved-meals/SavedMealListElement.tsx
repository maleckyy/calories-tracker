import { gapBetweenElements } from '@/consts/spacing/gaps';
import { MealCreate, SavedMeal } from '@/types/meal.type';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppCard } from '../shared/AppCard';
import { AppText } from '../shared/text/AppText';

type PropsType = {
    savedMeal: SavedMeal
    addMealFn: (newMeal: MealCreate) => void
    deleteFn: (id: string) => void
}

export default function SavedMealListElement({ savedMeal, addMealFn, deleteFn }: PropsType) {

    function handleAdd(saved: SavedMeal) {
        const mealCreate: MealCreate = (({ id, ...rest }) => rest)(saved);
        addMealFn(mealCreate)
    }

    const showMenu = (item: SavedMeal) => {
        Alert.alert(
            'Do you want to delete this?',
            undefined,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteFn(item.id)
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <AppCard style={styles.container} >
            <TouchableOpacity onPress={() => showMenu(savedMeal)}>
                <Ionicons name="remove-circle-outline" size={28}></Ionicons>
            </TouchableOpacity>

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
        gap: gapBetweenElements,
        flex: 1
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