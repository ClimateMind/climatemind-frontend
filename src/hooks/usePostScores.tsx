import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { postAlignment } from '../api/postAlignment';
import { submitScores } from '../api/postScores';
import ROUTES from '../components/Router/RouteConfig';
import { useAlignment } from '../hooks/useAlignment';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import { useAuth } from './auth/useAuth';
// import { useAlignmentMutation } from './useAlignmentMutation';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from './useToast';

export function usePostScores() {
  const { setQuizId } = useSession();
  // const { quizId, setQuizId, setAlignmentScoresId } = useSession();
  const { push } = useHistory();
  const { showToast } = useToast();
  const { accessToken } = useAuth();
  const quizResponses = useResponsesData();
  // eslint-disable-next-line
  const [value, storeValue] = useLocalStorage('quizId', '');
  const [alignmentValue, storeAlignmentValue] = useLocalStorage(
    'alignmentScoresId',
    ''
  );
  const { isUserB, conversationId, setAlignmentScoresId } = useAlignment();

  //const alignmentMutation = useAlignmentMutation();

  const SCORES = {
    SetOne: quizResponses.SetOne,
    SetTwo: quizResponses.SetTwo,
  };

  const mutation = useMutation(() => submitScores(SCORES, accessToken), {
    onError: (error: any) => {
      showToast({
        message: error.response?.data?.error || 'Unknow Error has occoured',
        type: 'error',
      });
    },
    onSuccess: (response: { quizId: string }) => {
      // Show Success Message
      showToast({
        message: 'Scores Registered',
        type: 'success',
      });
      // Set the session id
      setQuizId(response.quizId);
      storeValue(response.quizId);
      // Push the user to the correct page if User A
      !isUserB && push(ROUTES.ROUTE_VALUES);
    },
  });

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const alignmentMutation = useMutation(
    ({ conversationId, quizId }: { conversationId: string; quizId: string }) =>
      postAlignment({ conversationId, quizId }),
    {
      onSuccess: (response: { alignmentScoresId: string }) => {
        console.log('sucessfully posted alignmentId: ', response);
        // setAlignmentId(response.alignmentId);
        setAlignmentScoresId(response.alignmentScoresId);
        storeAlignmentValue(response.alignmentScoresId);
      },
      onError: (error: any) => {
        showToast({
          message: 'Failed to post aligment: ' + error.response?.data?.error,
          type: 'error',
        });
      },
    }
  );

  //TODO: handle loading states for both mutation and alignmentMutation

  const postScores = async () => {
    const scoresResult = await mutateAsync();
    console.log('scoresResult: ', scoresResult);
    if (isUserB) {
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
