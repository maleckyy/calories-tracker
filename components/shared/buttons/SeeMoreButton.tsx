import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AppText } from '../text/AppText'

type PropsType = {
    text: string
    onPress: () => void
}

export default function SeeMoreButton({ text, onPress }: PropsType) {
    return (
        <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
            <AppText variant='base' bold>{text}</AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        paddingBlock: 4,
        paddingInline: 8,
        borderWidth: 1,
        borderRadius: 10,
    }
})