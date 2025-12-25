import { AppCard } from '@/components/shared/AppCard'
import { AppText } from '@/components/shared/text/AppText'
import { gapBetweenElements } from '@/consts/spacing/gaps'
import { Hydration } from '@/types/hydration.type'
import { getTodayHydrationLevel } from '@/utils/hydration/getTodayHydrationLevel'
import React, { memo, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import SingleHydrationElement from './SingleHydrationElement'

type PropsType = {
    hydrationArray: Hydration[]
}

function HydrationHistorySection({ hydrationArray }: PropsType) {
    const todayHydration = useMemo(() => {
        return getTodayHydrationLevel(hydrationArray).slice()
            .sort((a, b) => b.date.localeCompare(a.date));
    }, [hydrationArray]);

    return (
        <AppCard style={{ gap: gapBetweenElements }}>
            <AppText variant='large'>History</AppText>
            <View style={styles.container}>
                {todayHydration.length > 0 && todayHydration.map(h => <SingleHydrationElement key={h.id} hydrationElement={h} />)}
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