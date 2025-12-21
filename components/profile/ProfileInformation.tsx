import { User } from '@/types/user.type'
import { getGenderName } from '@/utils/getGenderName/getGenderName'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { AppCard } from '../shared/AppCard'
import { AppText } from '../shared/text/AppText'

type PropsType = {
    user: User,
    redirect: () => void
}

function ProfileInformation({ user, redirect }: PropsType) {
    return (
        <View style={styles.containerMain}>
            <AppCard >
                <View style={styles.containerUserWrapper}>
                    <View style={styles.containerUser}>
                        <AppText style={styles.username}>{user.username}</AppText>
                        <AppText style={styles.dateOfBirth}>Date of birth: {user.birthDate}</AppText>
                        <AppText style={styles.gender}>Gender: {getGenderName(user.gender)}</AppText>
                    </View>
                    <TouchableOpacity style={{ paddingBlock: 4 }} onPress={redirect}>
                        <Ionicons name="settings" size={24}></Ionicons>
                    </TouchableOpacity>
                </View>
                <AppText style={styles.conditionTitle}>Physical condition of the user</AppText>
                <View style={styles.containerDetails}>
                    <AppText>{user.weight} kg</AppText>
                    <AppText>{user.height} cm</AppText>
                </View>
            </AppCard>
        </View>
    )
}

export default memo(ProfileInformation)

const styles = StyleSheet.create({
    containerMain: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 8
    },
    containerUserWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
    },
    containerUser: {
        flexDirection: 'column',
        gap: 4,
    },
    username: { color: '#000', fontSize: 32 },
    dateOfBirth: { fontSize: 15 },
    gender: { fontSize: 15 },
    conditionTitle: { fontSize: 18, marginTop: 8, marginBottom: 4 },
    containerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 8
    },
});