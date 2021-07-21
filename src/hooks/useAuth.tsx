import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { loginResponse, postLogin } from '../api/postLogin';
import { postLogout } from '../api/postLogout';
import ROUTES from '../components/Router/RouteConfig';
import { AuthContext, AuthDispatch, emptyUser } from '../contexts/auth';
import { useSession } from '../hooks/useSession';
import { useToast } from '../hooks/useToast';
import { TAuth } from '../types/Auth';

interface userLogin {
  email: string;
  password: string;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  const setAuth = useContext(AuthDispatch);
  const { showToast } = useToast();
  const { push } = useHistory();
  const { clearSession, setQuizId } = useSession();

  const mutateLogin = useMutation(
    (loginCreds: userLogin) => postLogin(loginCreds),
    {
      onError: (error: any) => {
        console.log({ error });
        showToast({
          message: error.response?.data?.error || 'Newtwork Error',
          type: 'error',
        });
      },
      onSuccess: async (response: loginResponse) => {
        // Show notifications
        showToast({
          message: `Welcome, ${response.user.first_name}`,
          type: 'success',
        });

        // Set the login state
        const user = {
          firstName: response.user.first_name,
          lastName: response.user.last_name,
          email: response.user.email,
          userIntials: response.user.first_name[0] + response.user.last_name[0],
          accessToken: response.access_token,
          userId: response.user.user_uuid,
          isLoggedIn: true,
          quizId: response.user.quiz_id,
        };
        setUser(user);
        // TODO: Set the session id for the logged in user
        if (response.user.quiz_id) {
          setQuizId(response.user.quiz_id);
        } else {
          showToast({
            message: 'Error no session id',
            type: 'error',
          });
        }
        push(ROUTES.ROUTE_FEED);
      },
      // Redirect the user to the climate feed
    }
  );

  const mutateLogout = useMutation(() => postLogout(), {
    onError: () => {
      showToast({
        message: 'Error logging out',
        type: 'error',
      });
    },
    onSuccess: async () => {
      // Show notifications
      showToast({
        message: `Sucessfully logged out`,
        type: 'success',
      });
      push(ROUTES.ROUTE_HOME);
    },
  });

  const setUser = (user: TAuth) => {
    if (setAuth) {
      setAuth(user);
    }
  };

  const logout = async () => {
    // Clear out user details from state
    if (setAuth) {
      setAuth(emptyUser);
    }
    clearSession();
    // Unset the refresh token cookie.
    await mutateLogout.mutateAsync();
  };

  const login = async ({ email, password }: userLogin) => {
    // Call the api
    await mutateLogin.mutateAsync({
      email,
      password,
    });
  };

  const isLoggedIn = auth.isLoggedIn;

  const accessToken = auth.accessToken;

  return {
    auth,
    accessToken,
    setUser,
    login,
    logout,
    isLoggedIn,
  };
}
