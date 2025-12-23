import { AppCard } from '@/components/shared/AppCard';
import { AppText } from '@/components/shared/text/AppText';
import { grayMutedBackground, hydrationLevelColor } from '@/consts/colors/colors';
import { gapBetweenSection } from '@/consts/spacing/gaps';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type HydrationBarProps = {
    value: number;
    max: number;
};

export function HydrationLevel({ value, max }: HydrationBarProps) {
    const progress = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <AppCard>
            <View style={styles.container}>
                <View style={styles.textRow}>
                    <AppText variant="large">Hydration</AppText>
                    <AppText variant="base" bold>{value} / {max} ml</AppText>
                </View>
                <View style={styles.track}>
                    <View
                        style={[
                            styles.fill,
                            { width: `${progress}%` }
                        ]}
                    />
                </View>
            </View>
        </AppCard>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: gapBetweenSection
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    track: {
        height: 16,
        backgroundColor: grayMutedBackground,
        borderRadius: 12,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: hydrationLevelColor,
        borderRadius: 12,
    },
});