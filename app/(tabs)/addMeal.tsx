import MealForm from '@/components/meal-form/MealForm'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import SectionTitle from '@/components/shared/text/SectionTitle'
import { addMeal } from '@/db/actions/meals/createMeal'
import { useMealStore } from '@/stores/meals/useMealsStore'
import { MealCreate } from '@/types/meal.type'
import React from 'react'
import { StyleSheet } from 'react-native'
export default function AddMealScreen() {
    const { addMeal: addMealToStore } = useMealStore()

    function addMealToDb(data: MealCreate) {
        const newMeal = addMeal(data);
        addMealToStore(newMeal)
    };

    return (
        <AppSafeView>
            <AppContainer>
                <SectionTitle style={styles.sectionTitle}>Add meal</SectionTitle>
                <MealForm onSubmit={addMealToDb} />
            </AppContainer>
        </AppSafeView>
    )
}

const styles = StyleSheet.create({
    sectionTitle: { color: '#000', fontSize: 14 },
}); 
