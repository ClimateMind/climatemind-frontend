import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  postRegister,
  registrationPayload,
  registrationResponse,
} from '../../api/postRegister';
import ROUTES from '../../components/Router/RouteConfig';
import { useAuth } from './useAuth';
import { useToast } from '../useToast';
import { useSession } from '../useSession';
import { useErrorLogging } from '../useErrorLogging';

export function useRegister() {
  const { quizId } = useSession();
  const { logError } = useErrorLogging();

  const mutation = useMutation(
    (userDetails: registrationPayload) => postRegister(userDetails),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
        logError(error);
      },
      onSuccess: (res: registrationResponse) => {
        // Show Success Message
        showToast({
          message: 'You’ve joined Climate Mind!',
          type: 'success',
        });
        // Update auth context to log user in;
        const user = {
          firstName: res.user.first_name,
          lastName: res.user.last_name,
          email: res.user.email,
          userIntials: res.user.first_name[0] + res.user.last_name[0],
          accessToken: res.access_token,
          userId: res.user.user_uuid,
          isLoggedIn: true,
          quizId,
          isLoading: false,
        };
        setUserContext(user);
        // Redirect user to the climate feed on success registration
        push(ROUTES.ROUTE_FEED);
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;
  const { push } = useHistory();
  const { showToast } = useToast();
  const { setUserContext } = useAuth();

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    quizId,
  }: registrationPayload) => {
    await mutateAsync({
      firstName,
      lastName,
      email,
      password,
      quizId,
    });
  };

  return {
    register,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
