import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import ROUTES from '../router/RouteConfig';
import { useErrorLogging } from './useErrorLogging';
import { ClimateApi } from '../api/ClimateApi';
import { PostRegisterRequest } from '../api/requests';
import { PostRegisterResponse } from '../api/responses';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { login } from 'features/auth';

export function useRegister() {
  const dispatch = useAppDispatch();
  const { sessionId, user } = useAppSelector(state => state.auth);
  const { logError } = useErrorLogging();

  const mutation = useMutation(
    (userDetails: PostRegisterRequest) => new ClimateApi(sessionId, user.accessToken).postRegister(userDetails),
    {
      onError: (error: any) => {
        // showToast({
        //   message: error.response?.data?.error || 'Unknow Error has occoured',
        //   type: 'error',
        // });
        logError(error);
      },
      onSuccess: (res: PostRegisterResponse) => {
        // Show Success Message
        // showToast({
        //   message: 'You’ve joined Climate Mind!',
        //   type: 'success',
        // });

        // Update auth context to log user in;
        const newUser = {
          firstName: res.user.first_name,
          lastName: res.user.last_name,
          email: res.user.email,
          accessToken: res.access_token,
          userId: res.user.user_uuid,
          quizId: user.quizId,
        };
        dispatch(login(newUser));
        // Redirect user to the climate feed on success registration
        navigate(ROUTES.CLIMATE_FEED_PAGE);
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;
  const navigate = useNavigate();

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
