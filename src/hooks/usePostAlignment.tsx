import { useMutation } from 'react-query';
// import { useHistory } from 'react-router-dom';
// import ROUTES from '../components/Router/RouteConfig';
// import { useAlignment } from './useAlignment';
// import { useSession } from './useSession';
// import { useAuth } from './auth/useAuth';
// import { useLocalStorage } from './useLocalStorage';
import { useToast } from './useToast';
import { postAlignment } from '../api/postAlignment';
import { PostAlignmentRequest } from '../api/postAlignment';

export function usePostAlignment() {
  // const { push } = useHistory();
  const { showToast } = useToast();

  const mutation = useMutation(
    (payload: PostAlignmentRequest) => postAlignment(payload),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
      },
      onSuccess: () => {
        // Show Success Message
        showToast({
          message: 'Scores Registered',
          type: 'success',
        });
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const submitAlignment = async ({
    conversationId,
    quizId,
  }: PostAlignmentRequest) => {
    await mutateAsync({ conversationId, quizId });
  };

  return {
    submitAlignment,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
