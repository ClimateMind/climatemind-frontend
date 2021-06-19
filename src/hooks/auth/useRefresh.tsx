import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import postRefresh from '../../api/postRefresh';
import ROUTES from '../../components/Router/RouteConfig';
import { useToast } from '../useToast';

export function useRefresh() {
  const { push } = useHistory();
  const { showToast } = useToast();

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
