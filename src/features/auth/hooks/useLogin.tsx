import { CredentialResponse } from '@react-oauth/google';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useApiClient, useToastMessage } from 'shared/hooks';
import { loginUserA as loginA, loginUserB as loginB } from '../state/authSlice';

function useLogin() {
  const dispatch = useAppDispatch();
  const quizIdB = useAppSelector((state) => state.auth.userB.quizId);
  const quizIdA = useAppSelector((state) => state.auth.userA.quizId);
  
  const apiClient = useApiClient();
  const { showSuccessToast, showErrorToast } = useToastMessage();

  /**
   * Login a userA, so that he can see his feeds, conversations, profile, etc.
   * On success we save the userA data in the store for later use.
   *
   * Email and password are required.
   * @returns true if login was successful, false otherwise
   */
  async function loginGoogleUserA(response: CredentialResponse): Promise<boolean> {
    // const quizId = quizIdA || quizIdB;
    try {
      if (!response) {
        throw new Error('No credential received from Google');
      }

      const data = await apiClient.postGoogleLogin(response.toString(), quizIdA);

      showSuccessToast(`Welcome back, ${data.user.first_name}!`);
      const { first_name, last_name, email, quiz_id, user_uuid } = data.user;

      dispatch(
        loginA({
          firstName: first_name,
          lastName: last_name,
          email: email,
          userId: user_uuid,
          quizId: quiz_id,
        })
      );
      return true;
    } catch (error) {
      showErrorToast(error.response?.data.error ?? 'Unexpected Error. Please try again.');
      return false;
    }
  }

  async function loginGoogleUserB(response: CredentialResponse): Promise<boolean> {
    try {
      if (!response) {
        throw new Error('No credential received from Google');
      }

      const data = await apiClient.postGoogleLogin(response.toString(), quizIdB);
      console.log('data', data);

      showSuccessToast(`Welcome back, ${data.user.first_name}!`);
      const { first_name, last_name, email, quiz_id, user_uuid } = data.user;

      dispatch(
        loginB({
          firstName: first_name,
          lastName: last_name,
          email: email,
          userId: user_uuid,
          quizId: quiz_id,
        })
      );
      return true;
    } catch (error) {
      showErrorToast(error.response?.data.error ?? 'Unexpected Error. Please try again.');
      return false;
    }
  }

  async function loginUserA(email: string, password: string): Promise<boolean> {
    try {
      const data = await apiClient.postLogin(email, password);

      showSuccessToast(`Welcome back, ${data.user.first_name}!`);
      dispatch(
        loginA({
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          email: data.user.email,
          userId: data.user.user_uuid,
          quizId: data.user.quiz_id,
        })
      );
      return true;
    } catch (error) {
      showErrorToast(error.response?.data.error ?? 'Unexpected Error. Please try again.');
      return false;
    }
  }

  /**
   * Login a userB, so that he can skip the quiz in the userB journey.
   * On success we save the userB data in the store for later use.
   *
   * Email and password are required.
   * @returns true if login was successful, false otherwise
   */
  async function loginUserB(email: string, password: string): Promise<boolean> {
    try {
      const data = await apiClient.postLogin(email, password, false);

      dispatch(
        loginB({
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          email: data.user.email,
          userId: data.user.user_uuid,
          quizId: data.user.quiz_id,
        })
      );

      return true;
    } catch (error) {
      showErrorToast(error.response?.data.error ?? 'Unexpected Error. Please try again.');
      return false;
    }
  }

  return { loginUserA, loginUserB, loginGoogleUserA, loginGoogleUserB };
}

export default useLogin;
