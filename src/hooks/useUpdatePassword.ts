import { useMutation } from 'react-query';
import { useToast } from './useToast';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { useSession } from './useSession';
import { useAuth } from './auth/useAuth';
import { PutPasswordRequest } from '../api/requests';
import { PutPasswordResponse } from '../api/responses';

export function useUpdatePassword() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();
  
  const { logError } = useErrorLogging();
  const mutation = useMutation(
    (passwordDetails: PutPasswordRequest) => new ClimateApi(sessionId, accessToken).putPassword(passwordDetails),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
        logError(error);
      },
      onSuccess: (_: PutPasswordResponse) => {
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
  }: PutPasswordRequest) => {
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
