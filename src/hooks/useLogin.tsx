// import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { postLogin } from '../api/postLogin';

type loginPayload = {
  username: string;
  password: string;
};

export function useLogin() {
  const {
    isLoading,
    isError,
    mutateAsync,
    isSuccess,
    // data,
    // status,
  } = useMutation((loginCreds: loginPayload) => postLogin(loginCreds));

  const login = async ({ username, password }: loginPayload) => {
    console.log('logging in', { username, password });
    try {
      const response = await mutateAsync({
        username: username,
        password: password,
      });
      console.log({ response });
      // TODO: Save token to state
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
    register,
    isLoading,
    isSuccess,
    isError,
  };
}
