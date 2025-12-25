import { HydrationLevel } from '@/components/charts/hydration/HydrationLevel'
import AddHydrationSection from '@/components/hydration/action-cards/AddHydrationSection'
import HydrationHistorySection from '@/components/hydration/hydration-history/HydrationHistorySection'
import HydrationStats from '@/components/hydration/hydration-stats/HydrationStats'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import ScreenHeader from '@/components/shared/ScreenHeader'
import { useHydrationStore } from '@/stores/hydration/useHydrationStore'
import { useUserStore } from '@/stores/user/useUserStore'
import { getTodayHydrationLevel } from '@/utils/hydration/getTodayHydrationLevel'
import React, { useMemo } from 'react'

export default function HydrationScreen() {
    const { hydration } = useHydrationStore()
    const { user } = useUserStore()

    const currentHydrationLevel = useMemo(() => {
        const todayItems = getTodayHydrationLevel(hydration);
        return todayItems.reduce((acc, entry) => {
            return acc + entry.waterAmount;
        }, 0);
    }, [hydration]);

    if (!user) return
    return (
        <AppSafeView>
            <AppContainer>
                <ScreenHeader title='Hydration' />
                <HydrationLevel value={currentHydrationLevel} max={user.waterGoal} />
                <HydrationStats waterGoal={user.waterGoal} hydrationLevel={currentHydrationLevel} />
                <AddHydrationSection />
                <HydrationHistorySection />
            </AppContainer>
        </AppSafeView>
    )
}
