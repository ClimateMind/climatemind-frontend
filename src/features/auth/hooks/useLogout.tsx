import { useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { useApiClient, useToastMessage } from 'shared/hooks';
import { useAppDispatch } from 'store/hooks';
import { logout as logoutUser } from '../state/authSlice';

function useLogout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const apiClient = useApiClient();
  const { showSuccessToast } = useToastMessage();

  async function logout() {
    try {
      await apiClient.postLogout();
    } catch {
      // The logout endpoint simply invalidates the refresh token
      // on the backend. It seems like this can fail, maybe because
      // the refresh token is already invalid.

      // Therefore, we just ignore the error here.
    }

    dispatch(logoutUser());
    navigate(ROUTES.HOME_PAGE);
    showSuccessToast('Goodbye!');
  }

  return { logout };
}

export default useLogout;
