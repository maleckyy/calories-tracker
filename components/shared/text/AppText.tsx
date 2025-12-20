import React from 'react';
import { Text, TextProps } from 'react-native';

export function AppText({ style, ...props }: TextProps) {
    return <Text {...props} style={[{ fontFamily: 'Onest-900' }, style]} />
}
