import { grayBackground, macrosColors, whiteColor } from '@/consts/colors/colors';
import { Meal } from '@/types/meal.type';
import React, { memo } from 'react';
import { Dimensions, View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { AppCard } from '../shared/AppCard';
import { LegendItem } from './LegendItem';

const screenWidth = Dimensions.get('window').width - 60

function MacrosChart({ meals }: { meals: Meal[] }) {
    const totals = meals.reduce(
        (acc, meal) => {
            acc.protein += meal.protein
            acc.carbs += meal.carbs
            acc.fat += meal.fat
            return acc
        },
        { protein: 0, carbs: 0, fat: 0 }
    )

    const totalMacros = totals.protein + totals.carbs + totals.fat

    const data = {
        labels: ["Protein", "Carbs", "Fat"],
        colors: [
            macrosColors.protein,
            macrosColors.carbs,
            macrosColors.fat,
        ],
        data: totalMacros > 0
            ? [
                totals.protein / totalMacros,
                totals.carbs / totalMacros,
                totals.fat / totalMacros,
            ]
            : [0, 0, 0]
    }

    const chartConfig: AbstractChartConfig = {
        backgroundColor: whiteColor,
        backgroundGradientFrom: whiteColor,
        backgroundGradientTo: whiteColor,
        decimalPlaces: 2,
        color: () => grayBackground,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        propsForLabels: {
            fontSize: 12,
        }
    }
    return (
        <AppCard
            style={{
                alignItems: "center",
                justifyContent: "center",
            }}>
            <ProgressChart
                data={data}
                width={screenWidth}
                height={220}
                strokeWidth={18}
                radius={32}
                chartConfig={chartConfig}
                hideLegend={true}
                withCustomBarColorFromData
            />
            <View style={{
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
                gap: 16
            }}>
                <LegendItem color={macrosColors.protein} label={"Protein | " + totals.protein + "g"} />
                <LegendItem color={macrosColors.carbs} label={"Carbs | " + totals.carbs + "g"} />
                <LegendItem color={macrosColors.fat} label={"Fat | " + totals.fat + "g"} />
            </View>
        </AppCard>
    )
}

export default memo(MacrosChart)

