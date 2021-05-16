import { useContext } from 'react';
import { TAuth } from '../types/Auth';
import { AuthContext } from '../contexts/auth';
import { AuthDispatch } from '../contexts/auth';
import { useMutation } from 'react-query';
import { postLogin, loginResponse } from '../api/postLogin';
import { useToast } from '../hooks/useToast';
import { useHistory } from 'react-router';
import ROUTES from '../components/Router/RouteConfig';
import { getInitials } from '../helpers/getInitials';

interface userLogin {
  email: string;
  password: string;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  const setAuth = useContext(AuthDispatch);
  const { showToast } = useToast();
  const { push } = useHistory();

  const { mutateAsync } = useMutation(
    (loginCreds: userLogin) => postLogin(loginCreds),
    {
      onError: (error: any) => {
        console.log({ error });
        showToast({
          message: error.message,
          type: 'error',
        });
      },
      onSuccess: (response: loginResponse) => {
        // Show notifications
        showToast({
          message: `Welcome, ${response.user.full_name}`,
          type: 'success',
        });
        // TODO: Set the session id for the logged in user

        // Set the login state
        const user = {
          fullName: response.user.full_name,
          email: response.user.email,
          userIntials: getInitials(response.user.full_name),
          accessToken: response.access_token,
          userId: response.user.user_uuid,
          isLoggedIn: true,
        };
        setUser(user);
        // Redirect the user to the climate feed
        push(ROUTES.ROUTE_FEED);
      },
    }
  );

  const setUser = (user: TAuth) => {
    if (setAuth) {
      setAuth(user);
    }
  };

  const logout = () => {
    // TODO: Implement log OUT function
  };

  const login = async ({ email, password }: userLogin) => {
    // Call the api
    await mutateAsync({
      email,
      password,
    });
  };

  const isLoggedIn = auth.isLoggedIn;

  return {
    auth,
    setUser,
    login,
    logout,
    isLoggedIn,
  };
}
