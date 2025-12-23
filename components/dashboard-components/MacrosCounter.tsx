import { macrosColors, whiteColor } from '@/consts/colors/colors'
import { gapBetweenSection } from '@/consts/spacing/gaps'
import { Meal } from '@/types/meal.type'
import { User } from '@/types/user.type'
import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import SmallDisplayCard from '../shared/small-display-card/SmallDisplayCard'

type PropsType = {
    meals: Meal[],
    user: User
}

function MacrosCounter({ meals, user }: PropsType) {
    const totals = meals.reduce(
        (acc, meal) => {
            acc.protein += meal.protein
            acc.carbs += meal.carbs
            acc.fat += meal.fat
            return acc
        },
        { protein: 0, carbs: 0, fat: 0 }
    )

    const proteinPercentage = Math.round((totals.protein / user.proteinRequirement) * 100);
    const carbsPercentage = Math.round((totals.carbs / user.carbsRequirement) * 100);
    const fatPercentage = Math.round((totals.fat / user.fatRequirement) * 100);

    return (
        <View style={styles.container}>
            <SmallDisplayCard
                title='Protein'
                textValue={`${proteinPercentage}%`}
                backGroundColor={whiteColor}
                dotColor={macrosColors.protein}
                dotSize={14}
            />
            <SmallDisplayCard
                title='Carbs'
                textValue={`${carbsPercentage}%`}
                backGroundColor={whiteColor}
                dotColor={macrosColors.carbs}
                dotSize={14}
            />
            <SmallDisplayCard
                title='Fat'
                textValue={`${fatPercentage}%`}
                backGroundColor={whiteColor}
                dotColor={macrosColors.fat}
                dotSize={14}
            />
        </View>
    )
}

export default memo(MacrosCounter)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: gapBetweenSection
    }
})
