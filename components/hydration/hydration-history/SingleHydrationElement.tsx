import { AppText } from '@/components/shared/text/AppText'
import { Hydration } from '@/types/hydration.type'
import { formatTime } from '@/utils/formatTime/formatTime'
import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'

type PropsType = {
    hydrationElement: Hydration
}

function SingleHydrationElement({ hydrationElement }: PropsType) {
    return (
        <View style={styles.container}>
            <AppText variant='medium'>+ {hydrationElement.waterAmount} ml</AppText>
            <AppText>{formatTime(hydrationElement.date)}</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default memo(SingleHydrationElement)