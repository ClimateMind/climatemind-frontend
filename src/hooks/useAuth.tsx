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
  const {
    isLoading,
    isError,
    mutateAsync,
    isSuccess,
    error,
  } = useMutation((loginCreds: loginPayload) => postLogin(loginCreds));

  console.log({ error });
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
    signOut();
    push(ROUTES.ROUTE_LOGIN);
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
      showToast({
        message: error.message,
        type: 'error',
      });
    }
  };

  // TODO: Add Register method
  const register = () => {
    console.log('FAKE register');
  };

  return {
    login,
    logout,
    register,
    isLoading,
    isSuccess,
    isError,
    user,
  };
}
