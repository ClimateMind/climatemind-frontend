import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { submitScores } from '../api/postScores';
import ROUTES from '../components/Router/RouteConfig';
import { useAuth } from '../hooks/useAuth';
import { useResponsesData } from '../hooks/useResponses';
import { useSession } from '../hooks/useSession';
import { useToast } from './useToast';

export function usePostScores() {
  const { quizSessionId, setSessionId } = useSession();
  const { push } = useHistory();
  const { showToast } = useToast();
  const { accessToken } = useAuth();
  const quizResponses = useResponsesData();

  const SCORES = {
    SetOne: quizResponses.SetOne,
    SetTwo: quizResponses.SetTwo,
    zipCode: null,
  };

  const mutation = useMutation(
    () => submitScores(SCORES, quizSessionId, accessToken),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
      },
      onSuccess: (response: { sessionId: string }) => {
        // Show Success Message
        showToast({
          message: 'Scores Registered',
          type: 'success',
        });

        // Set the session id
        setSessionId(response.sessionId);
        // Push the user to the correct page
        push(ROUTES.ROUTE_VALUES);
      },
    }
  );

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
