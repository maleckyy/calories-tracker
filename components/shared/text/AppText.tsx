import { blackColor } from '@/consts/colors/colors';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

type TextVariant = 'base' | 'small' | 'medium' | 'large' | 'xlarge';

interface AppTextProps extends TextProps {
    variant?: TextVariant;
    bold?: boolean
}

export function AppText({ style, variant = 'base', bold, ...props }: AppTextProps) {
    return (
        <Text
            {...props}
            style={[
                styles.default,
                styles[variant],
                bold && styles.bold,
                style,
            ]}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontFamily: 'Onest-400',
        color: blackColor,
    },
    small: {
        fontSize: 12,
        fontFamily: 'Onest-100',
    },
    base: {
        fontSize: 14,
        fontFamily: 'Onest-400',
    },
    medium: {
        fontSize: 16,
        fontFamily: 'Onest-900',
    },
    large: {
        fontSize: 20,
        fontFamily: 'Onest-900',

    },
    xlarge: {
        fontSize: 24,
        fontFamily: 'Onest-900',
    },
    bold: {
        fontFamily: 'Onest-900',
    }
});