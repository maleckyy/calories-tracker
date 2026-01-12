import { AppCard } from '@/components/shared/AppCard'
import { AppText } from '@/components/shared/text/AppText'
import { deleteHydrationById } from '@/db/actions/hydration/deleteHydrationById'
import { useHydrationStore } from '@/stores/hydration/useHydrationStore'
import { Hydration, HydrationGroup } from '@/types/hydration.type'
import { formatDate } from '@/utils/formatDate/formatDate'
import React, { useCallback } from 'react'
import SingleHydrationElement from './SingleHydrationElement'

export default function HydrationHistoryList() {
    const hydration = useHydrationStore(state => state.hydration)
    const removeHydration = useHydrationStore(state => state.removeHydration)
    const sortedHydration = [...hydration].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const deleteHydrationFromDb = useCallback((id: string) => {
        const res = deleteHydrationById(id)
        if (res === true) removeHydration(id)
    }, [removeHydration])

    const groupedHydration: HydrationGroup[] = React.useMemo(() => {
        const groups = sortedHydration.reduce((acc, hydration) => {
            const dayKey = new Date(hydration.date).toISOString().split('T')[0]

            if (!acc[dayKey]) {
                acc[dayKey] = []
            }
            acc[dayKey].push(hydration)
            return acc
        }, {} as Record<string, Hydration[]>)

        return Object.entries(groups)
            .map(([day, hydration]) => ({
                day,
                hydration: hydration.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            }))
            .sort((a, b) => new Date(b.day).getTime() - new Date(a.day).getTime())
    }, [sortedHydration])

    return (
        <>
            {sortedHydration && groupedHydration.map(g => {
                return (
                    <AppCard key={g.day}>
                        <AppText variant='large'>{formatDate(g.day)}</AppText>
                        {g && g.hydration.map(m => <SingleHydrationElement hydrationElement={m} key={m.id} deleteFn={deleteHydrationFromDb} />)}
                    </AppCard>
                )
            })}
        </>
    )
}
