import { useMutation } from 'react-query';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { useSession } from './useSession';
import { useAuth } from './auth/useAuth';
import { PutPasswordRequest } from '../api/requests';
import { PutPasswordResponse } from '../api/responses';
import { useToastMessage } from 'shared/hooks';

export function useUpdatePassword() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const { showSuccessToast, showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();
  const mutation = useMutation(
    (passwordDetails: PutPasswordRequest) => new ClimateApi(sessionId, accessToken).putPassword(passwordDetails),
    {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || 'Unknow Error has occoured');
        logError(error);
      },
      onSuccess: (_: PutPasswordResponse) => {
        showSuccessToast('Password changed successfully!');
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

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
