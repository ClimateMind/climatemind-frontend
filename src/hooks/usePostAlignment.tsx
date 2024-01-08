import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useAlignment } from './useAlignment';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { useToastMessage } from 'shared/hooks';
import { useAppSelector } from 'store/hooks';

type TPostAlignmentRequest = {
  conversationId: string;
  quizId: string;
};

export function usePostAlignment() {
  const { sessionId, user } = useAppSelector(state => state.auth);

  const { showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();
  const { setAlignmentScoresId } = useAlignment();

  const mutation = useMutation(
    (payload: TPostAlignmentRequest) =>
      new ClimateApi(sessionId, user.accessToken).postAlignment(
        payload.conversationId,
        payload.quizId
      ),
    {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || 'Unknow Error has occoured');
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
