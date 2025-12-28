import AllSavedMealsList from '@/components/saved-meals/AllSavedMealsList';
import AppContainer from '@/components/shared/AppContainer';
import AppSafeView from '@/components/shared/AppSafeView';
import ScreenHeader from '@/components/shared/ScreenHeader';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AllSavedMeals() {
    const insets = useSafeAreaInsets();
    return (
        <AppSafeView paddingBottom={insets.bottom} buttonsBackground>
            <AppContainer>
                <ScreenHeader title='All saved meals' backHref={'/(tabs)/meals'} />
                <AllSavedMealsList />
            </AppContainer>
        </AppSafeView>
    )
}
