import { gapBetweenElements } from '@/consts/spacing/gaps';
import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

export default function AppContainer({ style, ...props }: ViewProps) {
    return (
        <View {...props} style={styles.container} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: gapBetweenElements,
    },
});
