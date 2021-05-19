import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import {
  postRegister,
  registrationPayload,
  registrationResponse,
} from '../api/postRegister';
import ROUTES from '../components/Router/RouteConfig';
import { getInitials } from '../helpers/getInitials';
import { useAuth } from '../hooks/useAuth';
import { useToast } from './useToast';

export function useRegister() {
  const mutation = useMutation(
    (userDetails: registrationPayload) => postRegister(userDetails),
    {
      onError: (error: any) => {
        showToast({
          message: error.response.data.error || 'Unknow Error has occoured',
          type: 'error',
        });
      },
      onSuccess: (res: registrationResponse) => {
        // Show Success Message
        showToast({
          message: 'Account Created',
          type: 'success',
        });
        // Update auth context to log user in;
        const user = {
          fullName: res.user.full_name,
          email: res.user.email,
          userIntials: getInitials(res.user.full_name),
          accessToken: res.access_token,
          userId: res.user.user_uuid,
          isLoggedIn: true,
        };
        setUser(user);
        // Redirect user to the climate feed on success registration
        push(ROUTES.ROUTE_FEED);
      },
    }
  );

  const { isLoading, isError, mutateAsync, isSuccess, error } = mutation;
  const { push } = useHistory();
  const { showToast } = useToast();
  const { setUser } = useAuth();

  const register = async ({
    fullname,
    email,
    password,
    sessionId,
  }: registrationPayload) => {
    await mutateAsync({
      fullname,
      email,
      password,
      sessionId,
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
