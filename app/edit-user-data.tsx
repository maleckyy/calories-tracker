import ProfileForm from '@/components/profile-form/ProfileForm'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import SectionTitle from '@/components/shared/text/SectionTitle'
import { updateUser } from '@/db/actions/user/updateUserData'
import { useUserStore } from '@/stores/user/useUserStore'
import { User } from '@/types/user.type'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function EditUserDataScreen() {
    const user = useUserStore(state => state.user)
    const setUserDate = useUserStore(state => state.setUser)
    const router = useRouter()

    function updateUserDataFn(data: User) {
        const updatedUser = updateUser(data)
        if (updatedUser) {
            setUserDate(updatedUser)
            router.replace('/(tabs)/profile')
        }
    }

    return (
        <AppSafeView>
            <AppContainer>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{
                            marginRight: 'auto',
                            position: 'absolute',
                            left: 0
                        }}
                        onPress={() => router.replace('/(tabs)/profile')}
                    >
                        <Ionicons name="arrow-back" size={22}></Ionicons>
                    </TouchableOpacity>
                    <SectionTitle style={styles.sectionTitle}>Edit User</SectionTitle>
                </View>
                {user && <ProfileForm initialData={user} onSubmit={updateUserDataFn} />}
            </AppContainer>
        </AppSafeView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    sectionTitle: { color: '#000', fontSize: 14 },
});
