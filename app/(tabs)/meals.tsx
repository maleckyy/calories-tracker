import AddNewMealButton from '@/components/meals/AddNewMealButton'
import RecentlyAddedMeals from '@/components/meals/RecentlyAddedMeals'
import SavedMealsList from '@/components/meals/SavedMealsList'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import ScreenHeader from '@/components/shared/ScreenHeader'
import { useRouter } from 'expo-router'
import React from 'react'

export default function MealScreen() {
    const router = useRouter()

    return (
        <AppSafeView>
            <AppContainer>
                <ScreenHeader title='Meals' />
                <AddNewMealButton onPress={() => router.replace('/add-new-meal')} />
                <RecentlyAddedMeals />
                <SavedMealsList />
            </AppContainer>
        </AppSafeView>
    )
}