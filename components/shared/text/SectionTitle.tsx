import React from 'react';
import { TextProps } from 'react-native';
import { AppText } from './AppText';

export default function SectionTitle({ ...props }: TextProps) {
    return (
        <AppText {...props} variant='xlarge' />
    )
}
