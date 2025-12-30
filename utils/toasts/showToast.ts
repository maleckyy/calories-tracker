import Toast, { ToastType } from 'react-native-toast-message';

export const showToast = (type: ToastType, title: string, message?: string) => {
    Toast.show({
        type: type,
        text1: title,
        text2: message,
        visibilityTime: 2000,
    });
};