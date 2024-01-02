import { useContext } from 'react';
import { ToastContext } from 'shared/contexts';

function useToastMessage() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToastMessage must be used within a ToastProvider');
  }

  return {
    showSuccessToast: context.showSuccessToast,
    showErrorToast: context.showErrorToast,
  };
}

export default useToastMessage;
