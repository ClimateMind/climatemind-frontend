import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import ROUTES from '../router/RouteConfig';
import { useAlignment } from '../hooks/useAlignment';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import { useErrorLogging } from './useErrorLogging';
import { useUserB } from './useUserB';
import { ClimateApi } from '../api/ClimateApi';
import { useAuth } from './auth/useAuth';
import { useToastMessage } from 'shared/hooks';

type TPostAlignmentRequest = {
  conversationId: string;
  quizId: string;
};

export function usePostScores() {
  const { setQuizId, sessionId } = useSession();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const quizResponses = useResponsesData();

  const { showSuccessToast, showErrorToast } = useToastMessage();
  const { logError } = useErrorLogging();
  const { setAlignmentScoresId } = useAlignment();
  const { isUserBJourney, conversationId } = useUserB();

  const questionResponses = {
    SetOne: quizResponses.SetOne,
    SetTwo: quizResponses.SetTwo,
  };

  const mutation = useMutation(
    () =>
      new ClimateApi(sessionId, accessToken).postScores({
        questionResponses,
        isUserB: isUserBJourney,
      }),
    {
      onError: (error: any) => {
        showErrorToast(error.response?.data?.error || 'Unknow Error has occoured');
        logError(error);
      },
      onSuccess: (response: { quizId: string }) => {
        showSuccessToast('Quiz completed!');
        // Set the session id
        setQuizId(response.quizId);
        window.localStorage.setItem('quizId', response.quizId);
        // Push the user to the correct page if User A
        if (!isUserBJourney) {
          navigate(ROUTES.PERSONAL_VALUES_PAGE);
        }
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const alignmentMutation = useMutation(
    ({ conversationId, quizId }: TPostAlignmentRequest) =>
      new ClimateApi(sessionId, accessToken).postAlignment(
        conversationId,
        quizId
      ),
    {
      onSuccess: (response: { alignmentScoresId: string }) => {
        setAlignmentScoresId(response.alignmentScoresId);
        window.localStorage.setItem('alignmentScoresId', response.alignmentScoresId);
      },
      onError: (error: any) => {
        // showToast({
        //   message: 'Failed to post aligment: ' + error.response?.data?.error,
        //   type: 'error',
        // });
        logError(error);
      },
    }
  );

  //TODO: handle loading states for both mutation and alignmentMutation

  const postScores = async () => {
    const scoresResult = await mutateAsync();
    if (isUserBJourney) {
      await alignmentMutation.mutateAsync({
        conversationId: conversationId ?? '',
        quizId: scoresResult.quizId,
      });
    }
  };

  return {
    postScores,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
