import { useMutation } from 'react-query';
import postRefresh from '../../api/postRefresh';

export function useRefresh() {
  const mutation = useMutation(() => postRefresh());
  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;

  const fetchRefreshToken = async () => {
    const res = await mutateAsync();
    return res;
  };

  return {
    fetchRefreshToken,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
