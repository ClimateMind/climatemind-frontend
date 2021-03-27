import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { postLogin } from '../api/postLogin';
import { useSignIn, useSignOut } from 'react-auth-kit';
import { useHistory } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';
import ROUTES from '../components/Router/RouteConfig';
import { useToast } from './useToast';

type loginPayload = {
  username: string;
  password: string;
};

export function useAuth() {
  const { isLoading, isError, mutateAsync, isSuccess } = useMutation(
    (loginCreds: loginPayload) => postLogin(loginCreds),
    {
      onError: (error: any) => {
        showToast({
          message: error.response.data.error,
          type: 'error',
        });
      },
    }
  );

  const refreshToken = () => {
    console.log('refreshing token');
  };

  const { push } = useHistory();
  const [user, setUser] = useState({} as any);
  const signOut = useSignOut();

  const signIn = useSignIn();
  const auth = useAuthUser();
  const { showToast } = useToast();

  useEffect(() => {
    const user = auth();
    setUser(user);
  }, [setUser, auth]);

  const logout = () => {
    try {
      signOut();
    } catch (err) {
      console.log({ err });
      showToast({
        message: err.message,
        type: 'error',
      });
    } finally {
      showToast({
        message: 'Logged out sucessfully',
        type: 'success',
      });
      push(ROUTES.ROUTE_LOGIN);
    }
  };

  const login = async ({ username, password }: loginPayload) => {
    try {
      // Post Login
      const res = await mutateAsync({
        username: username,
        password: password,
      });
      // Save token to state on success - react-auth-kit
      signIn({
        token: res.access_token,
        expiresIn: 3000,
        tokenType: 'Bearer',
        authState: { isLoggedIn: true },
        // refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
        // refreshTokenExpireIn: res.data.refreshTokenExpireIn,
      });
      // Redirect account page on login
      if (res) {
        push(ROUTES.ROUTE_ACCOUNT_HOME);
      }
    } catch (error) {
      console.error(error);
    }
    // setTimeout(() => {
    //   refreshToken();
    // }, 60);
  };

  return {
    login,
    logout,
    isLoading,
    isSuccess,
    isError,
    user,
  };
}
