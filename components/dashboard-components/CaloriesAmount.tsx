import { grayColor } from '@/consts/colors/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../shared/text/AppText';

export default function CaloriesAmount({ kcal }: { kcal: number }) {
    return (
        <View style={styles.container}>
            <AppText variant='xlarge'>{`Today's calories`}</AppText>
            <View style={styles.caloriesView}>
                <AppText style={styles.caloriesAmountText}>{kcal}</AppText>
                <AppText style={styles.caloriesSuffixText}>Kcal</AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { width: '100%', marginBottom: -12, marginTop: 4 },
    caloriesView: { flexDirection: 'row', alignItems: 'flex-start', marginTop: -8 },
    caloriesAmountText: { fontSize: 84 },
    caloriesSuffixText: { fontSize: 28, marginTop: 16, marginLeft: 4, color: grayColor }
}); 
