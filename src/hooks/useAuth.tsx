// import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { postLogin } from '../api/postLogin';
import { useSignIn, useSignOut } from 'react-auth-kit';

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
  } = useMutation((loginCreds: loginPayload) => postLogin(loginCreds));

  const signIn = useSignIn();

  const logout = useSignOut();

  const login = async ({ username, password }: loginPayload) => {
    console.log('logging in', { username, password });
    try {
      // Post Login
      const res = await mutateAsync({
        username: username,
        password: password,
      });
      // Save token to state on sucess - react-auth-kit
      console.log({ res });
      signIn({
        token: res.access_token,
        expiresIn: 3000,
        tokenType: 'Bearer',
        authState: { isLoggedIn: true },
        // refreshToken: res.data.refreshToken, // Only if you are using refreshToken feature
        // refreshTokenExpireIn: res.data.refreshTokenExpireIn,
      });
    } catch (error) {
      console.error(error);
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
  };
}
