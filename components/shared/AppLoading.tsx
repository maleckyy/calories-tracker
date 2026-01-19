import { mainColor } from '@/consts/colors/colors'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { AppText } from './text/AppText'

export default function AppLoading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={84} color={mainColor} />
            <AppText variant='large' style={{ marginTop: 8 }}>Loading...</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    }
})