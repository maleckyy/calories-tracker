import { blackColor } from '@/consts/colors/colors';
import React, { ReactNode } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaViewProps, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppSafeView({ children, paddingBottom = 0, buttonsBackground = false }: { children: ReactNode, paddingBottom?: number, buttonsBackground?: boolean } & SafeAreaViewProps) {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar barStyle="dark-content" />
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 12,
                    paddingHorizontal: 12,
                    paddingBottom: paddingBottom + 12,
                }}
                contentInsetAdjustmentBehavior="never"
                showsVerticalScrollIndicator={false}
            >
                {children}
            </ScrollView>
            {buttonsBackground && (
                <View
                    style={[
                        styles.bottomBackground,
                        { height: insets.bottom, backgroundColor: blackColor }
                    ]}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    bottomBackground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: blackColor,
    },
});
