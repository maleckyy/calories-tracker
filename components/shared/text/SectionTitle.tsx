import { blackColor } from '@/consts/colors/colors';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export default function SectionTitle({ style, ...props }: TextProps) {
    return (
        <Text style={styles.text}  {...props} />
    )
}

const styles = StyleSheet.create({
    text: { color: blackColor, fontSize: 24, fontFamily: 'Onest-900' },
});