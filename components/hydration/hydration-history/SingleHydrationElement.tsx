import { AppCard } from '@/components/shared/AppCard'
import { AppText } from '@/components/shared/text/AppText'
import { grayCardBackground, hydrationLevelColor, whiteColor } from '@/consts/colors/colors'
import { gapBetweenElements } from '@/consts/spacing/gaps'
import { Hydration } from '@/types/hydration.type'
import { formatTime } from '@/utils/formatTime/formatTime'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { memo } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'

type PropsType = {
    hydrationElement: Hydration,
    deleteFn: (id: string) => void
}

function SingleHydrationElement({ hydrationElement, deleteFn }: PropsType) {

    function handleDelete(id: string) {
        deleteFn(id)
    }

    const showMenu = (item: Hydration) => {
        Alert.alert(
            'Do you want to delete this?',
            undefined,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => handleDelete(item.id)
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <AppCard style={{ backgroundColor: grayCardBackground }}>
            <View style={styles.container}>
                <View style={styles.iconWrapper}>
                    <Ionicons name='water-sharp' size={22} color={whiteColor} />
                </View>
                <View style={{ flex: 1 }}>
                    <AppText variant='medium'>{hydrationElement.waterAmount} ml</AppText>
                    <AppText>{formatTime(hydrationElement.date)}</AppText>
                </View>
                <TouchableOpacity onPress={() => showMenu(hydrationElement)}>
                    <Ionicons name='remove-circle-outline' size={22} />
                </TouchableOpacity>
            </View>
        </AppCard>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: gapBetweenElements,
        alignItems: 'center'
    },
    iconWrapper: {
        borderRadius: '50%',
        backgroundColor: hydrationLevelColor,
        padding: 4
    }
})

export default memo(SingleHydrationElement)