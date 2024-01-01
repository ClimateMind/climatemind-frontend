import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useAlignment } from './useAlignment';
// import { useToast } from './useToast';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { useSession } from './useSession';
import { useAuth } from './auth/useAuth';

type TPostAlignmentRequest = {
  conversationId: string;
  quizId: string;
};

export function usePostAlignment() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  // const { showToast } = useToast();
  const { logError } = useErrorLogging();
  const { setAlignmentScoresId } = useAlignment();

  const mutation = useMutation(
    (payload: TPostAlignmentRequest) =>
      new ClimateApi(sessionId, accessToken).postAlignment(
        payload.conversationId,
        payload.quizId
      ),
    {
      onError: (error: any) => {
        // showToast({
        //   message: error.response?.data?.error || 'Unknow Error has occoured',
        //   type: 'error',
        // });
        logError(error);
      },
      onSuccess: (response) => {
        setAlignmentScoresId(response.alignmentScoresId);
      },
    }
  );

  const { data, isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const submitAlignment = useCallback(
    async ({ conversationId, quizId }: { conversationId: string, quizId: string }) => {
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
