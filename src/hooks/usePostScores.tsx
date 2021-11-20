import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { submitScores } from '../api/postScores';
import ROUTES from '../components/Router/RouteConfig';
import { useAuth } from './auth/useAuth';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import { useToast } from './useToast';
import { useLocalStorage } from './useLocalStorage';
import { useAlignment } from '../hooks/useAlignment';

export function usePostScores() {
  const { setQuizId } = useSession();
  const { push } = useHistory();
  const { showToast } = useToast();
  const { accessToken } = useAuth();
  const quizResponses = useResponsesData();
  // eslint-disable-next-line
  const [value, storeValue] = useLocalStorage('quizId', '');
  const { isUserB } = useAlignment();

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

  const postScores = async () => {
    await mutateAsync();
  };

  return {
    postScores,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
