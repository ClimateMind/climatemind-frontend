import { useMutation } from 'react-query';
import { useCallback } from 'react';
import { postAlignment, PostAlignmentRequest } from '../api/postAlignment';
// import { useHistory } from 'react-router-dom';
// import ROUTES from '../components/Router/RouteConfig';
import { useAlignment } from './useAlignment';
// import { useAuth } from './auth/useAuth';
// import { useLocalStorage } from './useLocalStorage';
import { useToast } from './useToast';

export function usePostAlignment() {
  // const { push } = useHistory();
  const { showToast } = useToast();
  const { setAlignmentId } = useAlignment();

  const mutation = useMutation(
    (payload: PostAlignmentRequest) => postAlignment(payload),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
      },
      onSuccess: (response: { alignmentId: string }) => {
        // Set alignmentId so we can check how users align
        setAlignmentId(response.alignmentId);
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const submitAlignment = useCallback(
    async ({ conversationId, quizId }: PostAlignmentRequest) => {
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
