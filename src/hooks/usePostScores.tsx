import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  postAlignment,
  TPostAlignmentRequest,
} from '../api/postAlignment';
import { submitScores } from '../api/postScores';
import { useAlignment } from '../hooks/useAlignment';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import { ROUTES_CONFIG } from '../routes/routes';
import { useAuth } from './auth/useAuth';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from './useToast';

export function usePostScores() {
  const { setQuizId } = useSession();
  const { push } = useHistory();
  const { showToast } = useToast();
  const { accessToken } = useAuth();
  const quizResponses = useResponsesData();
  // eslint-disable-next-line
  const [value, storeValue] = useLocalStorage('quizId', '');
  // eslint-disable-next-line
  const [storedAlignmentValue, setStoredAlignmentValue] =
    useLocalStorage('alignmentScoresId', '');
  const { isUserB, conversationId, setAlignmentScoresId } =
    useAlignment();

  const SCORES = {
    SetOne: quizResponses.SetOne,
    SetTwo: quizResponses.SetTwo,
  };

  const mutation = useMutation(
    () => submitScores(SCORES, accessToken),
    {
      onError: (error: any) => {
        showToast({
          message:
            error.response?.data?.error ||
            'Unknow Error has occoured',
          type: 'error',
        });
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
        !isUserB && push(ROUTES_CONFIG.ROUTE_VALUES);
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } =
    mutation;

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
          message:
            'Failed to post aligment: ' + error.response?.data?.error,
          type: 'error',
        });
      },
    }
  );

  //TODO: handle loading states for both mutation and alignmentMutation

  const postScores = async () => {
    const scoresResult = await mutateAsync();
    if (isUserB) {
      await alignmentMutation.mutateAsync({
        conversationId: conversationId,
        quizId: scoresResult.quizId,
        jwt: accessToken,
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
