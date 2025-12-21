import { grayMutedBackground } from '@/consts/colors/colors'
import { User } from '@/types/user.type'
import { getUserGoal } from '@/utils/getUserGoal/getUserGoal'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppCard } from '../shared/AppCard'
import { AppText } from '../shared/text/AppText'

function UserGoals({ user }: { user: User }) {
    return (
        <AppCard style={{ gap: 8 }}>
            <View style={{ gap: 8 }}>
                <AppText style={styles.sectionTitle}>{`Your goal's`}</AppText>
                <View style={styles.container}>
                    <AppCard style={styles.mediumCard}>
                        <View style={styles.iconWrapper}>
                            <Ionicons name='ribbon-outline' size={28}></Ionicons>
                        </View>
                        <View>
                            <AppText>Goal</AppText>
                            <AppText>{getUserGoal(user.goal)}</AppText>
                        </View>
                    </AppCard>
                    <AppCard style={styles.mediumCard}>
                        <View style={styles.iconWrapper}>
                            <Ionicons name='water-outline' size={28}></Ionicons>
                        </View>
                        <View>
                            <AppText>Hydration</AppText>
                            <AppText>{user.waterGoal} ml</AppText>
                        </View>
                    </AppCard>
                </View>
            </View>
        </AppCard>
    )
}

export default memo(UserGoals)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
    },
    mediumCard: {
        width: '30%',
        backgroundColor: grayMutedBackground,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexGrow: 1,
    },
    sectionTitle: { color: '#000', fontSize: 18 },
    iconWrapper: {
        width: 28, alignItems: 'center'
    }
});
