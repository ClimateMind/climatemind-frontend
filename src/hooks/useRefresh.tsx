import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import postRefresh from '../api/postRefresh';
import ROUTES from '../components/Router/RouteConfig';
import { useToast } from './useToast';

export function useRefresh() {
  const { push } = useHistory();
  const { showToast } = useToast();
  // const auser = useAuth();

  const mutation = useMutation(() => postRefresh(), {
    onError: (error: any) => {
      showToast({
        message: error.response?.data?.error || 'Unknow Error has occoured',
        type: 'error',
      });
      console.log({ error });
      push(ROUTES.ROUTE_LOGIN);
    },
    onSuccess: (response) => {
      // Show Success Message
      showToast({
        message: 'Token Refreshed',
        type: 'success',
      });
    },
  });

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const fetchRefreshToken = async () => {
    console.log('Fetching Token');
    return await mutateAsync();
  };

  return {
    fetchRefreshToken,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
