import MealForm from '@/components/meal-form/MealForm'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import SectionTitle from '@/components/shared/text/SectionTitle'
import { updateMeal } from '@/db/actions/meals/updateMeal'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { Meal, MealCreate } from '@/types/meal.type'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
export default function EditMealScreen() {
    const router = useRouter()
    const { id } = useLocalSearchParams()

    const { meals, updateMeal: updateMealToStore } = useMealStore()
    const meal = meals.find(m => m.id === id)

    function updateMealToDb(data: Meal | MealCreate) {
        const updatedMeal = updateMeal(data as Meal)
        if (updatedMeal) {
            updateMealToStore(updatedMeal)
        }
    };
    if (!meal) {
        router.replace('/(tabs)')
    }

    return (
        <AppSafeView>
            <AppContainer>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{
                            marginRight: 'auto',
                            position: 'absolute',
                            left: 0
                        }}
                        onPress={() => router.replace('/')}
                    >
                        <Ionicons name="arrow-back" size={22}></Ionicons>
                    </TouchableOpacity>
                    <SectionTitle style={styles.sectionTitle}>Edit meal</SectionTitle>
                </View>
                <MealForm onSubmit={updateMealToDb} initialData={meal} />
            </AppContainer>
        </AppSafeView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    sectionTitle: { color: '#000', fontSize: 14 },
});

