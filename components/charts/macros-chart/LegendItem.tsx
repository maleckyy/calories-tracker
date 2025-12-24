import React from "react"
import { StyleSheet, View } from "react-native"
import { AppText } from "../../shared/text/AppText"

type LegendItemProps = {
    color: string
    label: string
}

export function LegendItem({ color, label }: LegendItemProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <AppText bold>{label}</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 12,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6,
    },
})
