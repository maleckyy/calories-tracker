import { AppCard } from '@/components/shared/AppCard';
import { AppText } from '@/components/shared/text/AppText';
import { gapBetweenSection } from '@/consts/spacing/gaps';
import { addHydration } from '@/db/actions/hydration/createHydration';
import { useHydrationStore } from '@/stores/hydration/useHydrationStore';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AddHydrationCard from './AddHydrationCard';

export default function AddHydrationSection() {
    const { addHydration: addHydrationToStore } = useHydrationStore()

    function addHydrationLevel(amount: number) {
        const newItem = addHydration({ waterAmount: amount })
        addHydrationToStore(newItem)
    }

    return (
        <AppCard style={{ gap: gapBetweenSection }}>
            <AppText variant='large'>Add water</AppText>
            <View style={styles.container}>
                <AddHydrationCard waterAmount={250} addFn={addHydrationLevel} />
                <AddHydrationCard waterAmount={500} addFn={addHydrationLevel} />
                <AddHydrationCard waterAmount={1000} addFn={addHydrationLevel} />
            </View>
        </AppCard>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        width: '100%'
    },
});