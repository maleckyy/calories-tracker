import { whiteColor } from '@/consts/colors/colors'
import { Meal } from '@/types/meal.type'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React, { memo } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppText } from '../shared/text/AppText'

type PropsType = {
    meal: Meal
    deleteFn: (id: string) => void
}

function SingleMealItem({ meal, deleteFn }: PropsType) {
    const router = useRouter()

    function handleEdit(item: Meal) {
        router.replace(`/edit-meal?id=${meal.id}`)
    }

    function handleDelete(id: string) {
        deleteFn(id)
    }

    const showMenu = (item: Meal) => {
        Alert.alert(
            item.name,
            `What do you want to do with this meal?`,
            [
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => handleDelete(item.id)
                },
                { text: "Cancel", style: "cancel" },
                { text: "Edit", onPress: () => handleEdit(item) }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerName}>
                <View style={styles.containerData}>
                    <AppText style={styles.mealNameText}>
                        {meal.name}
                    </AppText>
                    <AppText>|</AppText>
                    <AppText style={styles.mealNameText}>
                        {meal.kcal} Kcal
                    </AppText>
                </View>
                <TouchableOpacity onPress={() => showMenu(meal)}>
                    <Ionicons name="ellipsis-vertical-outline" size={19}></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={styles.containerDetails}>
                <AppText style={styles.mealNameText}>
                    Protein {meal.protein}g
                </AppText>
                <AppText style={styles.mealNameText}>
                    Carbs {meal.carbs}g
                </AppText>
                <AppText style={styles.mealNameText}>
                    Fat {meal.fat}g
                </AppText>
            </View>
        </View>
    )
}

export default memo(SingleMealItem)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: whiteColor,
        flexDirection: 'column',
        gap: 8,
        marginBlock: 6,
        borderRadius: 10,
        paddingBlock: 8,
        paddingInline: 12
    },
    containerName: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    mealNameText: {
        fontSize: 16
    }
})
