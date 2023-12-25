import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import ROUTES from '../../router/RouteConfig';
import { useAuth } from './useAuth';
import { useToast } from '../useToast';
import { useSession } from '../useSession';
import { useErrorLogging } from '../useErrorLogging';
import { ClimateApi } from '../../api/ClimateApi';
import { PostRegisterRequest } from '../../api/requests';
import { PostRegisterResponse } from '../../api/responses';

export function useRegister() {
  const { quizId, sessionId } = useSession();
  const { accessToken } = useAuth();
  const { logError } = useErrorLogging();

  const mutation = useMutation(
    (userDetails: PostRegisterRequest) => new ClimateApi(sessionId, accessToken).postRegister(userDetails),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Unknow Error has occoured',
          type: 'error',
        });
        logError(error);
      },
      onSuccess: (res: PostRegisterResponse) => {
        // Show Success Message
        showToast({
          message: 'You’ve joined Climate Mind!',
          type: 'success',
        });
        console.log("REGISTER RESPONSE START");
        console.log(res.user.first_name);
        console.log("REGISTER RESPONSE END");
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
        navigate(ROUTES.CLIMATE_FEED_PAGE);
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setUserContext } = useAuth();

  const register = async ({
    firstName,
    lastName,
    email,
    password,
    quizId,
  }: PostRegisterRequest) => {
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
