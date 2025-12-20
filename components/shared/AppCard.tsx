import { whiteColor } from "@/consts/colors/colors"
import React from "react"
import { StyleSheet, View, ViewProps } from "react-native"

type CardProps = ViewProps & {
    children: React.ReactNode
}

export function AppCard({ children, style, ...rest }: CardProps) {
    return (
        <View style={[styles.card, style]} {...rest}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        width: "100%",
        padding: 0,
        overflow: 'hidden',
        backgroundColor: whiteColor,
    },
})
