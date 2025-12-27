import { blackColor, grayBackground } from '@/consts/colors/colors';
import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';

interface AppTextInputProps extends TextInputProps {
    style?: StyleProp<TextStyle>;
}

export default function AppTextInput({ style, ...rest }: AppTextInputProps) {
    return <TextInput style={[styles.input, style]} {...rest} />;
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: grayBackground,
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: blackColor,
    },
});