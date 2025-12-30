import { blackColor, dangerColor, infoColor, successColor } from '@/consts/colors/colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { View } from 'react-native'
import { ToastConfigParams, ToastProps, ToastType } from 'react-native-toast-message'
import { AppCard } from '../shared/AppCard'
import { AppText } from '../shared/text/AppText'

export default function ToastComponent(props: ToastConfigParams<ToastProps>) {

    function getIconName(type: ToastType) {
        switch (type) {
            case 'success':
                return "checkmark-circle-outline"
            case 'error':
                return 'close-circle-outline'
            default:
                return 'information-circle-outline'
        }
    }

    function getIconColor(type: ToastType) {
        switch (type) {
            case 'success':
                return successColor
            case 'error':
                return dangerColor
            default:
                return infoColor
        }
    }

    return (
        <AppCard style={{ width: '80%', borderWidth: 2, borderColor: blackColor }}>
            <View style={{
                flexDirection: 'row',
                gap: 8,
                alignItems: 'center'
            }}>
                <Ionicons name={getIconName(props.type)} size={32} color={getIconColor(props.type)} />
                <View>
                    <AppText variant='medium'>{props.text1}</AppText>
                    {props.text2 && <AppText variant='small' bold>{props.text2}</AppText>}
                </View>
            </View>
        </AppCard>
    )
}
