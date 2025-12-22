import ProfileInformation from '@/components/profile/ProfileInformation';
import UserGoals from '@/components/profile/UserGoals';
import UserRequirements from '@/components/profile/UserRequirements';
import AppContainer from '@/components/shared/AppContainer';
import AppSafeView from '@/components/shared/AppSafeView';
import ScreenHeader from '@/components/shared/ScreenHeader';
import { useUserStore } from '@/stores/user/useUserStore';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const { user } = useUserStore()
    const router = useRouter()

    function redirectToEditPage() {
        router.replace('/edit-user-data')
    }

    return (
        <AppSafeView>
            <AppContainer>
                <ScreenHeader title='Your Profile' />
                {user && (
                    <>
                        <ProfileInformation user={user} redirect={redirectToEditPage} />
                        <UserGoals user={user} />
                        <UserRequirements user={user} />
                    </>
                )}
            </AppContainer>
        </AppSafeView>
    );
}
