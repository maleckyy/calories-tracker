import Ionicons from '@expo/vector-icons/Ionicons'
import { Href, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppText } from './text/AppText'

type PropsType = {
    title: string,
    backHref?: Href
}

export default function ScreenHeader({ title, backHref }: PropsType) {
    const router = useRouter()

    return (
        <View style={styles.container}>
            {backHref && <TouchableOpacity
                style={{
                    marginRight: 'auto',
                    position: 'absolute',
                    left: 0
                }}
                onPress={() => router.replace(backHref)}
            >
                <Ionicons name="arrow-back" size={22}></Ionicons>
            </TouchableOpacity>}
            <AppText variant='xlarge'>{title}</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
});
