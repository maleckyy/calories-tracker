import ToastComponent from '@/components/toast-element/ToastComponent';
import { ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <ToastComponent {...props} />
  ),

  info: (props) => (
    <ToastComponent {...props} />
  ),

  error: (props) => (
    <ToastComponent {...props} />
  ),
};