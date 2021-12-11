import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { submitScores } from '../api/postScores';
import ROUTES from '../components/Router/RouteConfig';
import { useAlignment } from './useAlignment';
import { useResponsesData } from './useResponses';
import { useSession } from './useSession';
import { useAuth } from './auth/useAuth';
import { useLocalStorage } from './useLocalStorage';
import { useToast } from './useToast';
import { postAlignment } from '../api/postAlignment';
import { RequestBody } from '../api/postAlignment';

export function usePostAlignment() {
  // const { setQuizId } = useSession();
  // const { push } = useHistory();
  const { showToast } = useToast();

  const payload: RequestBody = {
    conversationId: 'hgyt3',
    quizId: '334fff',
  };

  const mutation = useMutation(() => postAlignment(payload));
  // {
  // onError: (error: any) => {
  //   // showToast({
  //   //   message: error.response?.data?.error || 'Unknow Error has occoured',
  //   //   type: 'error',
  //   // });
  // },
  // onSuccess: (response: { quizId: string }) => {
  //   // // Show Success Message
  //   // showToast({
  //   //   message: 'Scores Registered',
  //   //   type: 'success',
  //   // });
  // },
  // }

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const submitAlignment = async () => {
    await mutateAsync();
  };

  return {
    postAlignment,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
