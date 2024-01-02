import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { useSession } from './useSession';
import { useAuth } from './auth/useAuth';
import { useToastMessage } from 'shared/hooks';

export function usePostFeedback() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const { showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();

  const mutation = useMutation(
    (text: string) => new ClimateApi(sessionId, accessToken).postFeedback(text),
    {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || 'Unknow Error has occoured');
        logError(error);
      },
      onSuccess: () => {},
    }
  );

  const { data, isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const submitFeedback = useCallback(
    async (text: string) => {
      await mutateAsync(text);
    },
    [mutateAsync]
  );

  return {
    submitFeedback,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
