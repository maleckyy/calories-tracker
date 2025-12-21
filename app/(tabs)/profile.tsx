import ProfileInformation from '@/components/profile/ProfileInformation';
import UserGoals from '@/components/profile/UserGoals';
import UserRequirements from '@/components/profile/UserRequirements';
import AppContainer from '@/components/shared/AppContainer';
import AppSafeView from '@/components/shared/AppSafeView';
import SectionTitle from '@/components/shared/text/SectionTitle';
import { useUserStore } from '@/stores/user/useUserStore';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function ProfileScreen() {
    const { user } = useUserStore()
    const router = useRouter()

    function redirectToEditPage() {
        router.replace('/edit-user-data')
    }

    return (
        <AppSafeView>
            <AppContainer>
                <SectionTitle style={styles.sectionTitle}>Your Profile</SectionTitle>
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

const styles = StyleSheet.create({
    sectionTitle: { color: '#000', fontSize: 14 },
});