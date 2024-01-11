import { useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { useAppDispatch } from 'store/hooks';
import { useApiClient, useToastMessage } from 'shared/hooks';
import { logoutUserA as logoutA } from '../state/authSlice';

function useLogout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const apiClient = useApiClient();
  const { showSuccessToast } = useToastMessage();

  /**
   * Invalidate the refresh token on the backend and remove the userA data from the store.
   */
  async function logoutUserA() {
    try {
      await apiClient.postLogout();
    } catch {
      // The logout endpoint simply invalidates the refresh token
      // on the backend. It seems like this can fail, maybe because
      // the refresh token is already invalid.

      // Therefore, we just ignore the error here.
    }

    dispatch(logoutA());
    showSuccessToast('Goodbye!');
    navigate(ROUTES.HOME_PAGE);
  }

  return { logoutUserA };
}

export default useLogout;
