import { grayMutedBackground } from '@/consts/colors/colors'
import { Meal } from '@/types/meal.type'
import { formatDate } from '@/utils/formatDate/formatDate'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React, { memo } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppText } from '../shared/text/AppText'

type PropsType = {
    meal: Meal
    deleteFn: (id: string) => void
    showDate?: boolean
}

function SingleMealItem({ meal, deleteFn, showDate = false }: PropsType) {
    const router = useRouter()

    function handleEdit(item: Meal) {
        router.replace(`/edit-meal?id=${item.id}`)
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
                    <AppText variant='medium'>
                        {meal.name}
                    </AppText>
                    <AppText>|</AppText>
                    <AppText variant='medium'>
                        {meal.kcal} Kcal
                    </AppText>
                </View>
                <TouchableOpacity onPress={() => showMenu(meal)}>
                    <Ionicons name="ellipsis-vertical-outline" size={19}></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={styles.containerDetails}>
                <AppText>
                    Protein {meal.protein}g
                </AppText>
                <AppText>
                    Carbs {meal.carbs}g
                </AppText>
                <AppText>
                    Fat {meal.fat}g
                </AppText>
            </View>
            {showDate && <View style={styles.containerDate}>
                <AppText variant='base'>{formatDate(meal.date)}</AppText>
            </View>}
        </View>
    )
}

export default memo(SingleMealItem)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: grayMutedBackground,
        flexDirection: 'column',
        gap: 6,
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
    containerDate: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})
