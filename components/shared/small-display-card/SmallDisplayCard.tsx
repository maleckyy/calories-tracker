import { grayColor, grayMutedBackground } from '@/consts/colors/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppCard } from '../AppCard';
import { AppText } from '../text/AppText';

type IoniconsProps = React.ComponentProps<typeof Ionicons>;

type PropsType = {
    iconName?: IoniconsProps['name']
    title: string
    textValue: string
    dotColor?: string
}

export default function SmallDisplayCard({ iconName, title, textValue, dotColor = grayColor }: PropsType) {
    return (
        <AppCard style={styles.mediumCard}>
            <View style={styles.iconWrapper}>
                {iconName ?
                    <Ionicons name={iconName} size={28}></Ionicons>
                    :
                    <View style={[styles.dot, { backgroundColor: dotColor }]} />
                }
            </View>
            <View>
                <AppText variant='medium'>{title}</AppText>
                <AppText>{textValue}</AppText>
            </View>
        </AppCard>
    )
}

const styles = StyleSheet.create({
    mediumCard: {
        width: '30%',
        backgroundColor: grayMutedBackground,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexGrow: 1,
    },
    iconWrapper: {
        width: 28, alignItems: 'center'
    },
    dot: {
        width: 18,
        height: 18,
        borderRadius: '50%',
        marginRight: 6,
    },
});