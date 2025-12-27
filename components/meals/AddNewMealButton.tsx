import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import BaseButton from '../shared/buttons/BaseButton'

export default function AddNewMealButton({ ...rest }: TouchableOpacityProps) {
    return (
        <BaseButton title='Add Meal' style={{ width: '100%' }} {...rest} />
    )
}
