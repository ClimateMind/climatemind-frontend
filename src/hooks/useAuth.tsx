import { useContext } from 'react';
import { useMutation } from 'react-query';
import { postLogin } from '../api/postLogin';
import { useHistory } from 'react-router-dom';
import ROUTES from '../components/Router/RouteConfig';
import { useToast } from './useToast';
import { AuthContext } from '../contexts/auth';
import { AuthDispatch } from '../contexts/auth';

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

  const { push } = useHistory();
  const { showToast } = useToast();
  const auth = useContext(AuthContext);
  const setAuth = useContext(AuthDispatch);

  const { authToken } = auth;

  const logout = () => {
    // TODO: Make logout
    // try {
    //   signOut();
    // } catch (err) {
    //   console.log({ err });
    //   showToast({
    //     message: err.message,
    //     type: 'error',
    //   });
    // } finally {
    //   showToast({
    //     message: 'Logged out sucessfully',
    //     type: 'success',
    //   });
    //   push(ROUTES.ROUTE_LOGIN);
    // }
  };

  const fetchTokenSilently = () => {
    console.log('FAKE Fetching token');
  };

  const login = async ({ username, password }: loginPayload) => {
    if (!setAuth) return;
    try {
      // Post Login to api
      const res = await mutateAsync({
        username: username,
        password: password,
      });
      //  Throw and error if there is no access token
      if (!res.access_token) {
        const message = 'No Access Token Detected';
        showToast({
          message,
          type: 'error',
        });
        throw new Error(message);
      }
      // Save access token to state and redirect the user
      setAuth({
        authToken: res.access_token,
        user: null,
      });
      push(ROUTES.ROUTE_ACCOUNT_HOME);
    } catch (error) {
      console.error(error);
    }
    setInterval(fetchTokenSilently, 6000);
  };

  return {
    login,
    logout,
    authToken,
    isLoading,
    isSuccess,
    isError,
  };
}
