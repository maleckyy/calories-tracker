import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

export default function AppView({ children }: { children: ReactNode }) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', padding: 12 },
    text: { color: '#000', fontSize: 16, marginVertical: 5 },
});