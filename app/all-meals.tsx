import MealsList from '@/components/all-meals-list/MealsList'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import ScreenHeader from '@/components/shared/ScreenHeader'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AllMealsScreen() {
    const insets = useSafeAreaInsets();

    return (
        <AppSafeView paddingBottom={insets.bottom} buttonsBackground>
            <AppContainer>
                <ScreenHeader title='History of meals' backHref={'/(tabs)'} />
                <MealsList />
            </AppContainer>
        </AppSafeView>
    )
}
