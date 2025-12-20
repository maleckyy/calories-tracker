import React, { ReactNode } from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppSafeView({ children }: { children: ReactNode }) {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" />
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 12,
                    paddingHorizontal: 12,
                    paddingBottom: 12,
                }}
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});
