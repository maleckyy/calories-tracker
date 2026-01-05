import { blackColor, dangerColor, grayBackground, grayColor, mainColor, whiteColor } from '@/consts/colors/colors';
import { baseBorderRadius } from '@/consts/spacing/border';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

interface BaseButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: ButtonVariant;
    textStyle?: StyleProp<TextStyle>;
}

export default function BaseButton({
    title,
    style,
    textStyle,
    variant = 'primary',
    disabled,
    ...props
}: BaseButtonProps) {
    const containerStyles = [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        style,
    ];

    const getTextStyle = () => {
        const variantTextStyle = styles[`${variant}Text` as keyof typeof styles];
        return [
            styles.textBase,
            variantTextStyle,
            disabled && styles.disabledText,
            textStyle,
        ];
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled}
            style={containerStyles}
            {...props}
            accessibilityRole="button"
        >
            <Text style={getTextStyle()}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: baseBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textBase: {
        fontSize: 16,
        fontFamily: 'Onest-900',
        textAlign: 'center',
    },

    primary: {
        backgroundColor: mainColor,
        borderColor: blackColor,
        borderWidth: 2
    },
    primaryText: {
        color: blackColor,
    },

    secondary: {
        backgroundColor: blackColor,
        borderColor: blackColor,
        borderWidth: 2
    },
    secondaryText: {
        color: whiteColor,
    },

    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: blackColor,
    },
    outlineText: {
        color: blackColor,
    },

    ghost: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    ghostText: {
        color: blackColor,
    },

    danger: {
        backgroundColor: dangerColor,
        borderColor: dangerColor,
        borderWidth: 2
    },
    dangerText: {
        color: whiteColor,
    },

    disabled: {
        backgroundColor: grayBackground,
        borderColor: grayBackground,
    },
    disabledText: {
        color: grayColor,
    },
});