import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useToast } from './useToast';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { useSession } from './useSession';
import { useAuth } from './auth/useAuth';

export function usePostFeedback() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const { showToast } = useToast();
  const { logError } = useErrorLogging();

  const mutation = useMutation(
    (text: string) => new ClimateApi(sessionId, accessToken).postFeedback(text),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || "Feedback couldn't be sent",
          type: 'error',
        });
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
