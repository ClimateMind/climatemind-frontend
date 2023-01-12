import { useMutation } from 'react-query';
import {
  putPassword,
  putPasswordPayload,
  putPasswordResponse,
} from '../api/putPassword';
import { useToast } from './useToast';
import { useErrorLogging } from './useErrorLogging';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useUpdatePassword() {
  const { logError } = useErrorLogging();
  const mutation = useMutation(
    (passwordDetails: putPasswordPayload) => putPassword(passwordDetails),
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
        logError(error);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSuccess: (res: putPasswordResponse) => {
        // Show Success Message
        showToast({
          message: 'Password changed successfully!',
          type: 'success',
        });
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;
  const { showToast } = useToast();

  const updatePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }: putPasswordPayload) => {
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
