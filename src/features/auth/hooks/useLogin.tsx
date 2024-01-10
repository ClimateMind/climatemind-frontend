import { useNavigate } from 'react-router-dom';

import { useApiClient, useToastMessage } from 'shared/hooks';
import { useAppDispatch } from 'store/hooks';
import { login as loginUser } from '../state/authSlice';
import ROUTES from 'router/RouteConfig';

function useLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const apiClient = useApiClient();
  const { showSuccessToast, showErrorToast } = useToastMessage();

  async function login(email: string, password: string, recaptchaToken: string) {
    try {
      const data = await apiClient.postLogin(email, password, recaptchaToken);

      showSuccessToast(`Welcome back, ${data.user.first_name}!`);
      dispatch(loginUser({
        accessToken: data.access_token,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        email: data.user.email,
        userId: data.user.user_uuid,
        quizId: data.user.quiz_id,
      }));

      navigate(ROUTES.CLIMATE_FEED_PAGE);
    } catch (error) {
      showErrorToast(error.response?.data.error ?? 'Unexpected Error. Please try again.');
      return;
    }
  }

  return { login };
}

export default useLogin;
