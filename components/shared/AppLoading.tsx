import { mainColor } from '@/consts/colors/colors'
import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import AppContainer from './AppContainer'
import AppSafeView from './AppSafeView'
import SectionTitle from './text/SectionTitle'
export default function AppLoading() {
    return (
        <AppSafeView>
            <AppContainer style={styles.container}>
                <ActivityIndicator size="large" color={mainColor} />
                <SectionTitle style={styles.sectionTitle}>Loading</SectionTitle>
            </AppContainer>
        </AppSafeView>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
        backgroundColor: 'red'
    },

    sectionTitle: { color: '#000', fontSize: 8 },
});