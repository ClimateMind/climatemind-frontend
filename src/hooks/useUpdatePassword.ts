import { useMutation } from 'react-query';
import { useErrorLogging } from './useErrorLogging';
import { useApiClient, useToastMessage } from 'shared/hooks';

export function useUpdatePassword() {
  const apiClient = useApiClient();

  const { showSuccessToast, showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();
  const mutation = useMutation(
    ({ currentPassword, newPassword, confirmPassword }: {
      currentPassword: string,
      newPassword: string,
      confirmPassword: string
    }) => apiClient.putPassword(currentPassword, newPassword, confirmPassword),
    {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || 'Unknow Error has occoured');
        logError(error);
      },
      onSuccess: () => {
        showSuccessToast('Password changed successfully!');
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const updatePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }: {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  }) => {
    await mutateAsync({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return {
    updatePassword,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
