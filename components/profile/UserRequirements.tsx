import { grayMutedBackground, macrosColors } from '@/consts/colors/colors';
import { User } from '@/types/user.type';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppCard } from '../shared/AppCard';
import { AppText } from '../shared/text/AppText';

function UserRequirements({ user }: { user: User }) {
    return (
        <AppCard style={{ gap: 8 }}>
            <View style={{ gap: 8 }}>
                <AppText style={styles.sectionTitle}>Your requirements</AppText>
                <View style={styles.container}>
                    <AppCard style={styles.smallCard}>
                        <View style={styles.iconWrapper}>
                            <Ionicons name='flame-outline' size={28}></Ionicons>
                        </View>
                        <View>
                            <AppText>Calories</AppText>
                            <AppText>{user.calorieRequirement} Kcal</AppText>
                        </View>
                    </AppCard>
                    <AppCard style={styles.smallCard}>
                        <View style={styles.iconWrapper}>
                            <View style={[styles.dot, { backgroundColor: macrosColors.protein }]} />
                        </View>
                        <View>
                            <AppText>Protein</AppText>
                            <AppText>{user.proteinRequirement} g</AppText>
                        </View>
                    </AppCard>
                </View>
                <View style={styles.container}>
                    <AppCard style={styles.smallCard}>
                        <View style={styles.iconWrapper}>
                            <View style={[styles.dot, { backgroundColor: macrosColors.carbs }]} />
                        </View>
                        <View>
                            <AppText>Carbs</AppText>
                            <AppText>{user.carbsRequirement} g</AppText>
                        </View>
                    </AppCard>
                    <AppCard style={styles.smallCard}>
                        <View style={styles.iconWrapper}>
                            <View style={[styles.dot, { backgroundColor: macrosColors.fat }]} />
                        </View>
                        <View>
                            <AppText>Fat</AppText>
                            <AppText>{user.fatRequirement} g</AppText>
                        </View>
                    </AppCard>
                </View>
            </View>
        </AppCard>
    )
}

export default memo(UserRequirements)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap'
    },
    smallCard: {
        width: '20%',
        backgroundColor: grayMutedBackground,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexGrow: 1,
    },
    sectionTitle: { color: '#000', fontSize: 18 },
    dot: {
        width: 18,
        height: 18,
        borderRadius: '50%',
        marginRight: 6,
    },
    iconWrapper: {
        width: 28, alignItems: 'center'
    }
});
