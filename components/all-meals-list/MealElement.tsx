import { Meal } from '@/types/meal.type';
import { formatDate } from '@/utils/formatDate/formatDate';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React, { memo } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppCard } from '../shared/AppCard';
import { AppText } from '../shared/text/AppText';

type PropsType = {
    meal: Meal
    deleteFn: (id: string) => void
}

function MealElement({ meal, deleteFn }: PropsType) {
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
        <AppCard style={{ gap: 2 }}>
            <View style={styles.container}>
                <AppText variant='large'>{meal.name}</AppText>
                <TouchableOpacity onPress={() => showMenu(meal)}>
                    <Ionicons name="ellipsis-vertical-outline" size={19}></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={styles.containerDetails}>
                <AppText variant='medium'>
                    Protein {meal.protein}g
                </AppText>
                <AppText variant='medium'>
                    Carbs {meal.carbs}g
                </AppText>
                <AppText variant='medium'>
                    Fat {meal.fat}g
                </AppText>
            </View>
            <View style={styles.container}>
                <AppText variant='base'>{formatDate(meal.date)}</AppText>
            </View>
        </AppCard>
    )
}

export default memo(MealElement)

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerDetails: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 16
    },
})

