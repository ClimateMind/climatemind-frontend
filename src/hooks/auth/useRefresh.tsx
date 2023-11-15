import { useMutation } from 'react-query';
import { ClimateApi } from '../../api/ClimateApi';

export function useRefresh() {
  const mutation = useMutation(() => new ClimateApi(null, '').postRefresh());
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
