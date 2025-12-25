import SmallDisplayCard from '@/components/shared/small-display-card/SmallDisplayCard';
import { whiteColor } from '@/consts/colors/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type PropsType = {
    waterGoal: number,
    hydrationLevel: number
}

export default function HydrationStats({ waterGoal, hydrationLevel }: PropsType) {
    return (
        <View style={styles.container}>
            <SmallDisplayCard title='Goal' textValue={`${waterGoal.toString()} ml`} backGroundColor={whiteColor} iconName='ribbon-outline' />
            <SmallDisplayCard title='Hydration' textValue={`${hydrationLevel.toString()} ml`} backGroundColor={whiteColor} iconName='water-outline' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap'
    }
});