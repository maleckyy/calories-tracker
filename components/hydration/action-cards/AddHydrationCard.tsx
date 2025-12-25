import { AppText } from '@/components/shared/text/AppText'
import { grayCardBackground } from '@/consts/colors/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

type PropsType = {
    waterAmount: number,
    addFn: (waterAmount: number) => void
}

function AddHydrationCard({ waterAmount, addFn }: PropsType) {
    return (
        <TouchableOpacity style={styles.mediumCard} onPress={() => addFn(waterAmount)}>
            <Ionicons name='add-circle-outline' size={26} />
            <AppText variant='medium'>{waterAmount} ml</AppText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mediumCard: {
        width: '30%',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        borderRadius: 16,
        paddingBlock: 8,
        paddingInline: 12,
        backgroundColor: grayCardBackground,
    },
});

export default memo(AddHydrationCard)