import { useMutation } from 'react-query';
import { useCallback } from 'react';
import { postAlignment, TPostAlignmentRequest } from '../api/postAlignment';
import { useAlignment } from './useAlignment';
import { useToast } from './useToast';

export function usePostAlignment() {
  // const { push } = useHistory();
  const { showToast } = useToast();
  const { setAlignmentId } = useAlignment();

  const mutation = useMutation(
    (payload: TPostAlignmentRequest) => postAlignment(payload),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
      },
      onSuccess: (response) => {
        setAlignmentId(response.alignmentScoresId);
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

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
  };
}
