import HydrationHistoryList from '@/components/hydration/hydration-history/HydrationHistoryList';
import AppContainer from '@/components/shared/AppContainer';
import AppSafeView from '@/components/shared/AppSafeView';
import ScreenHeader from '@/components/shared/ScreenHeader';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HydrationHistoryScreen() {
    const insets = useSafeAreaInsets();

    return (
        <AppSafeView paddingBottom={insets.bottom} buttonsBackground>
            <AppContainer>
                <ScreenHeader title='History of hydration' backHref={'/(tabs)/hydration'} />
                <HydrationHistoryList />
            </AppContainer>
        </AppSafeView>
    )
}

