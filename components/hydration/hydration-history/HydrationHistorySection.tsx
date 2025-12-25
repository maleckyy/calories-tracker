import { AppCard } from '@/components/shared/AppCard'
import { AppText } from '@/components/shared/text/AppText'
import { gapBetweenElements } from '@/consts/spacing/gaps'
import { deleteHydrationById } from '@/db/actions/hydration/deleteHydrationById'
import { useHydrationStore } from '@/stores/hydration/useHydrationStore'
import { getTodayHydrationLevel } from '@/utils/hydration/getTodayHydrationLevel'
import React, { memo, useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import SingleHydrationElement from './SingleHydrationElement'

function HydrationHistorySection() {
    const { hydration, removeHydration } = useHydrationStore()

    const deleteHydrationFromDb = useCallback((id: string) => {
        const res = deleteHydrationById(id)
        if (res === true) removeHydration(id)
    }, [removeHydration])

    const todayHydration = useMemo(() => {
        return getTodayHydrationLevel(hydration).slice()
            .sort((a, b) => b.date.localeCompare(a.date));
    }, [hydration]);

    return (
        <AppCard style={{ gap: gapBetweenElements }}>
            <AppText variant='large'>History</AppText>
            <View style={styles.container}>
                {todayHydration.length > 0 && todayHydration.map(h => <SingleHydrationElement key={h.id} hydrationElement={h} deleteFn={deleteHydrationFromDb} />)}
            </View>
        </AppCard>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: gapBetweenElements,
        width: '100%'
    }
})

export default memo(HydrationHistorySection)