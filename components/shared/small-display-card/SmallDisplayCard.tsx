import { grayCardBackground, grayColor } from '@/consts/colors/colors';
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
    dotColor?: string,
    backGroundColor?: string,
    dotSize?: number,
    noIcon?: boolean
}

export default function SmallDisplayCard({ iconName, title, textValue, dotColor = grayColor, backGroundColor = grayCardBackground, dotSize = 18, noIcon = false }: PropsType) {
    return (
        <AppCard style={[styles.mediumCard, { backgroundColor: backGroundColor }]}>
            {!noIcon &&
                <View style={[styles.iconWrapper, { width: dotSize + 10 }]}>
                    {iconName ?
                        <Ionicons name={iconName} size={28}></Ionicons>
                        :
                        <View style={[styles.dot, {
                            backgroundColor: dotColor,
                            width: dotSize,
                            height: dotSize
                        }]} />
                    }
                </View>
            }
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexGrow: 1,
    },
    iconWrapper: {
        alignItems: 'center'
    },
    dot: {
        borderRadius: '50%',
        marginRight: 6,
    },
});