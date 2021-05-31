import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import postRefresh from '../api/postRefresh';
import ROUTES from '../components/Router/RouteConfig';
import { useAuth } from '../hooks/useAuth';
import { useToast } from './useToast';

export function useRefresh() {
  const { push } = useHistory();
  const { showToast } = useToast();
  const { accessToken } = useAuth();

  const mutation = useMutation(() => postRefresh(), {
    onError: (error: any) => {
      showToast({
        message: error.response?.data?.error || 'Unknow Error has occoured',
        type: 'error',
      });
    },
    onSuccess: (response) => {
      // Show Success Message
      console.log({ response });
      showToast({
        message: 'Token Refreshed',
        type: 'success',
      });
      // TODO: Update new access token to state
    },
  });

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const refreshToken = async () => {
    await mutateAsync();
  };

  return {
    refreshToken,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
