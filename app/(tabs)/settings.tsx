import AppContainer from '@/components/shared/AppContainer';
import AppSafeView from '@/components/shared/AppSafeView';
import SectionTitle from '@/components/shared/text/SectionTitle';
import { StyleSheet } from 'react-native';

export default function SettingsScreen() {
    return (
        <AppSafeView>
            <AppContainer>
                <SectionTitle style={styles.sectionTitle}>User Settings</SectionTitle>
            </AppContainer>
        </AppSafeView>
    );
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


