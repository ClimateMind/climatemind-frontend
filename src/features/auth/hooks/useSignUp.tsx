import { useApiClient, useToastMessage } from 'shared/hooks';
import { useAppDispatch } from 'store/hooks';
import { loginUserA } from '../state/authSlice';

function useSignUp() {
  const apiClient = useApiClient();
  const { showSuccessToast, showErrorToast } = useToastMessage();

  const dispatch = useAppDispatch();

  async function signUp(firstName: string, lastName: string, email: string, password: string, quizId: string) {
    try {
      const response = await apiClient.postRegister({ firstName, lastName, email, password, quizId });
      dispatch(loginUserA({
        firstName: response.user.first_name,
        lastName: response.user.last_name,
        email: response.user.email,
        userId: response.user.user_uuid,
        quizId: response.user.quiz_id,
      }));

      showSuccessToast(`Welcome, ${response.user.first_name}!`);
      return true;
    } catch (error) {
      showErrorToast(error.response?.data.error ?? 'Unexpected Error. Please try again.');
      return false;
    }
  }

  return { signUp };
}

export default useSignUp;
