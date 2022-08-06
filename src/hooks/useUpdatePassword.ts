import { useMutation } from 'react-query';
import {
  putPassword,
  putPasswordPayload,
  putPasswordResponse,
} from '../api/putPassword';
import { useToast } from './useToast';

export function useUpdatePassword() {

  const mutation = useMutation(
    (passwordDetails: putPasswordPayload) => putPassword(passwordDetails),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
      },
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
    updatePassword: updatePassword,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
