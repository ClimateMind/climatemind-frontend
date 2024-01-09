import { useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { useApiClient } from 'shared/hooks';
import { useAppDispatch } from 'store/hooks';
import { logout as logoutUser } from '../state/authSlice';

function useLogout() {
  const navigate = useNavigate();

  const apiClient = useApiClient();
  const dispatch = useAppDispatch();

  async function logout() {
    try {
      await apiClient.postLogout();

      dispatch(logoutUser());
      navigate(ROUTES.HOME_PAGE);
    } catch {
      // The logout endpoint simply invalidates the refresh token
      // on the backend. It seems like this can fail, maybe because
      // the refresh token is already invalid.

      // Therefore, we just ignore the error here.
    }
  }

  return { logout };
}

export default useLogout;
