import { AppCard } from '@/components/shared/AppCard'
import SeeMoreButton from '@/components/shared/buttons/SeeMoreButton'
import { AppText } from '@/components/shared/text/AppText'
import { deleteHydrationById } from '@/db/actions/hydration/deleteHydrationById'
import { useHydrationStore } from '@/stores/hydration/useHydrationStore'
import { getTodayHydrationLevel } from '@/utils/hydration/getTodayHydrationLevel'
import { useRouter } from 'expo-router'
import React, { memo, useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import SingleHydrationElement from './SingleHydrationElement'

function HydrationHistorySection() {
    const { hydration, removeHydration } = useHydrationStore()
    const router = useRouter()

    const deleteHydrationFromDb = useCallback((id: string) => {
        const res = deleteHydrationById(id)
        if (res === true) removeHydration(id)
    }, [removeHydration])

    const todayHydration = useMemo(() => {
        return getTodayHydrationLevel(hydration).slice()
            .sort((a, b) => b.date.localeCompare(a.date));
    }, [hydration]);

    return (
        <AppCard>
            <View style={styles.sectionWrapper}>
                <AppText variant='large'>History</AppText>
                <SeeMoreButton text='See all' onPress={() => router.push('/hydration-history')} />
            </View>
            {todayHydration.length > 0 && todayHydration.map(h => <SingleHydrationElement key={h.id} hydrationElement={h} deleteFn={deleteHydrationFromDb} />)}
            {todayHydration.length === 0 && <AppText>No hydration yet</AppText>}
        </AppCard>
    )
}

const styles = StyleSheet.create({
    sectionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default memo(HydrationHistorySection)