import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { postFeedback, TFeedbackRequest } from '../api/postFeedback';
import { useToast } from './useToast';
import { useErrorLogging } from './useErrorLogging';

export function useFeedback() {
  const { showToast } = useToast();
  const { logError } = useErrorLogging();

  const mutation = useMutation(
    (payload: TFeedbackRequest) => postFeedback(payload),
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
    async ({ text }: TFeedbackRequest) => {
      await mutateAsync({ text });
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
