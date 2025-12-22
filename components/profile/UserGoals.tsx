import { User } from '@/types/user.type'
import { getUserGoal } from '@/utils/getUserGoal/getUserGoal'
import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppCard } from '../shared/AppCard'
import SmallDisplayCard from '../shared/small-display-card/SmallDisplayCard'
import { AppText } from '../shared/text/AppText'

function UserGoals({ user }: { user: User }) {
    return (
        <AppCard style={{ gap: 8 }}>
            <View style={{ gap: 8 }}>
                <AppText variant='large'>{`Your goal's`}</AppText>
                <View style={styles.container}>
                    <SmallDisplayCard
                        iconName='ribbon-outline'
                        title='Goal'
                        textValue={getUserGoal(user.goal)}
                    />
                    <SmallDisplayCard
                        iconName='water-outline'
                        title='Hydration'
                        textValue={`${user.waterGoal} ml`}
                    />
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
});
