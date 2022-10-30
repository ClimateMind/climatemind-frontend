import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { postAlignment, TPostAlignmentRequest } from '../api/postAlignment';
import { useAlignment } from './useAlignment';
import { useToast } from './useToast';
import { useErrorLogging } from './useErrorLogging';

export function usePostAlignment() {
  const { showToast } = useToast();
  const { logError } = useErrorLogging();
  const { setAlignmentScoresId } = useAlignment();

  const mutation = useMutation(
    (payload: TPostAlignmentRequest) => postAlignment(payload),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
        logError(error);
      },
      onSuccess: (response) => {
        setAlignmentScoresId(response.alignmentScoresId);
      },
    }
  );

  const { data, isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const submitAlignment = useCallback(
    async ({ conversationId, quizId }: TPostAlignmentRequest) => {
      await mutateAsync({ conversationId, quizId });
    },
    [mutateAsync]
  );

  return {
    submitAlignment,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
  };
}
