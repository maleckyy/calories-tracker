import { grayColor } from '@/consts/colors/colors';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../shared/text/AppText';

type PropsType = {
    kcal: number,
    goalCalories: number
}

export default function CaloriesAmount({ kcal, goalCalories }: PropsType) {
    const caloriesLeft = useMemo(() => {
        return goalCalories - kcal
    }, [kcal, goalCalories])

    return (
        <View style={styles.container}>
            <AppText variant='xlarge'>{`Today's calories`}</AppText>
            <View style={styles.caloriesView}>
                <AppText style={styles.caloriesAmountText}>{kcal}</AppText>
                <AppText style={styles.caloriesSuffixText}>Kcal</AppText>
            </View>
            <AppText variant='large'>Calories left: {caloriesLeft} Kcal</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { width: '100%', marginTop: 4 },
    caloriesView: { flexDirection: 'row', alignItems: 'flex-start', marginTop: -8, marginBottom: -12 },
    caloriesAmountText: { fontSize: 84, lineHeight: 100 },
    caloriesSuffixText: { fontSize: 28, marginTop: 12, marginLeft: 4, color: grayColor }
}); 
