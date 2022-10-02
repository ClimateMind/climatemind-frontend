import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { postAlignment, TPostAlignmentRequest } from '../api/postAlignment';
import { submitScores } from '../api/postScores';
import ROUTES from '../components/Router/RouteConfig';
import { useAlignment } from '../hooks/useAlignment';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from './useToast';
import { useErrorLogging } from './useErrorLogging';
import { useUserB } from './useUserB';

export function usePostScores() {
  const { setQuizId } = useSession();
  const { push } = useHistory();
  const { showToast } = useToast();
  const quizResponses = useResponsesData();
  const { logError } = useErrorLogging();
  // eslint-disable-next-line
  const [value, storeValue] = useLocalStorage('quizId', '');
  // eslint-disable-next-line
  const [storedAlignmentValue, setStoredAlignmentValue] = useLocalStorage(
    'alignmentScoresId',
    ''
  );
  const { setAlignmentScoresId } = useAlignment();
  const { isUserBJourney, conversationId } = useUserB();

  const SCORES = {
    SetOne: quizResponses.SetOne,
    SetTwo: quizResponses.SetTwo,
  };

  const mutation = useMutation(() => submitScores(SCORES, isUserBJourney), {
    onError: (error: any) => {
      showToast({
        message: error.response?.data?.error || 'Unknow Error has occoured',
        type: 'error',
      });
      logError(error);
    },
    onSuccess: (response: { quizId: string }) => {
      // Show Success Message
      showToast({
        message: 'Quiz completed!',
        type: 'success',
      });
      // Set the session id
      setQuizId(response.quizId);
      storeValue(response.quizId);
      // Push the user to the correct page if User A
      if (!isUserBJourney) {
        push(ROUTES.ROUTE_VALUES);
      }
    },
  });

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const alignmentMutation = useMutation(
    ({ conversationId, quizId, jwt }: TPostAlignmentRequest) =>
      postAlignment({ conversationId, quizId, jwt }),
    {
      onSuccess: (response: { alignmentScoresId: string }) => {
        setAlignmentScoresId(response.alignmentScoresId);
        setStoredAlignmentValue(response.alignmentScoresId);
      },
      onError: (error: any) => {
        showToast({
          message: 'Failed to post aligment: ' + error.response?.data?.error,
          type: 'error',
        });
        logError(error);
      },
    }
  );

  //TODO: handle loading states for both mutation and alignmentMutation

  const postScores = async () => {
    const scoresResult = await mutateAsync();
    if (isUserBJourney) {
      await alignmentMutation.mutateAsync({
        conversationId: conversationId,
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
