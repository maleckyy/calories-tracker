import { grayColor } from '@/consts/colors/colors'
import { gapBetweenElements } from '@/consts/spacing/gaps'
import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppText } from '../shared/text/AppText'

type PropsType = {
    value: number | string
    suffix: string
    text: string
}

function PhysicalConditionBox({ value, suffix, text }: PropsType) {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <AppText variant='xlarge'>{value}</AppText>
                <AppText style={styles.textColor}>{suffix}</AppText>
            </View>
            <AppText bold variant='medium'>{text}</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
        flex: 1,
        paddingBlock: gapBetweenElements

    },
    wrapper: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'baseline'
    },
    textColor: {
        color: grayColor
    }
})

export default memo(PhysicalConditionBox)