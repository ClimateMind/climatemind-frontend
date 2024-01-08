import { useMutation } from 'react-query';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { PutPasswordRequest } from '../api/requests';
import { PutPasswordResponse } from '../api/responses';
import { useToastMessage } from 'shared/hooks';
import { useAppSelector } from 'store/hooks';

export function useUpdatePassword() {
  const { sessionId, user } = useAppSelector(state => state.auth);

  const { showSuccessToast, showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();
  const mutation = useMutation(
    (passwordDetails: PutPasswordRequest) => new ClimateApi(sessionId, user.accessToken).putPassword(passwordDetails),
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
