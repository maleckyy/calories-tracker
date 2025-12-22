import ProfileForm from '@/components/profile-form/ProfileForm'
import AppContainer from '@/components/shared/AppContainer'
import AppSafeView from '@/components/shared/AppSafeView'
import ScreenHeader from '@/components/shared/ScreenHeader'
import { updateUser } from '@/db/actions/user/updateUserData'
import { useUserStore } from '@/stores/user/useUserStore'
import { User } from '@/types/user.type'
import { useRouter } from 'expo-router'
import React from 'react'

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
                <ScreenHeader title='Edit Profile' backHref={'/(tabs)/profile'} />
                {user && <ProfileForm initialData={user} onSubmit={updateUserDataFn} />}
            </AppContainer>
        </AppSafeView>
    )
}

