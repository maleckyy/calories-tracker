import { grayColor, grayMutedBackground } from '@/consts/colors/colors'
import { gapBetweenElements } from '@/consts/spacing/gaps'
import { User } from '@/types/user.type'
import { formatDate } from '@/utils/formatDate/formatDate'
import { getGenderName } from '@/utils/getGenderName/getGenderName'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppCard } from '../shared/AppCard'
import { AppText } from '../shared/text/AppText'
import PhysicalConditionBox from './PhysicalConditionBox'

type PropsType = {
    user: User,
    redirect: () => void
}

function ProfileInformation({ user, redirect }: PropsType) {
    return (
        <AppCard>
            <View style={styles.containerMain}>
                <View style={styles.containerUserWrapper}>
                    <View style={styles.containerUserDetails}>
                        <Ionicons name='person-circle-outline' size={64} color={grayColor}></Ionicons>
                        <View style={styles.containerUser}>
                            <AppText variant='xlarge'>{user.username}</AppText>
                            <AppText >Date of birth: {formatDate(user.birthDate)}</AppText>
                            <AppText >Gender: {getGenderName(user.gender)}</AppText>
                        </View>
                    </View>
                    <TouchableOpacity style={{ paddingBlock: 4 }} onPress={redirect}>
                        <Ionicons name='settings' size={24}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerDetails}>
                    <PhysicalConditionBox value={user.weight} suffix='kg' text='Weight' />
                    <View style={styles.spacer}></View>
                    <PhysicalConditionBox value={user.height} suffix='cm' text='Height' />
                </View>
            </View>
        </AppCard>
    )
}

export default memo(ProfileInformation)

const styles = StyleSheet.create({
    containerMain: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        gap: gapBetweenElements
    },
    containerUserWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
    },
    containerUser: {
        flexDirection: 'column',
        gap: 2,
    },
    containerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: gapBetweenElements,
        width: '100%',
    },
    containerUserDetails: {
        flexDirection: 'row',
        gap: gapBetweenElements
    },
    spacer: {
        height: '70%',
        borderColor: grayMutedBackground,
        borderWidth: .5
    }
});