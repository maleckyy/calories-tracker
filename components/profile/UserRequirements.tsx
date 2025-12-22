import { macrosColors } from '@/consts/colors/colors';
import { User } from '@/types/user.type';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppCard } from '../shared/AppCard';
import SmallDisplayCard from '../shared/small-display-card/SmallDisplayCard';
import { AppText } from '../shared/text/AppText';

function UserRequirements({ user }: { user: User }) {
    return (
        <AppCard style={{ gap: 8 }}>
            <View style={{ gap: 8 }}>
                <AppText variant='large'>Your requirements</AppText>
                <View style={styles.container}>
                    <SmallDisplayCard
                        iconName='flame-outline'
                        title='Calories'
                        textValue={`${user.calorieRequirement} Kcal`}
                    />
                    <SmallDisplayCard
                        title='Protein'
                        textValue={`${user.waterGoal} g`}
                        dotColor={macrosColors.protein}
                    />
                </View>
                <View style={styles.container}>
                    <SmallDisplayCard
                        title='Protein'
                        textValue={`${user.carbsRequirement} g`}
                        dotColor={macrosColors.carbs}
                    />
                    <SmallDisplayCard
                        title='Fat'
                        textValue={`${user.fatRequirement} g`}
                        dotColor={macrosColors.fat}
                    />
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
    }
});
