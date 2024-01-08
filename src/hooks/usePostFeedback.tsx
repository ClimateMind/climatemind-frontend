import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useErrorLogging } from './useErrorLogging';
import { useApiClient, useToastMessage } from 'shared/hooks';

export function usePostFeedback() {
  const apiClient = useApiClient();

  const { showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();

  const mutation = useMutation(
    (text: string) => apiClient.postFeedback(text),
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
