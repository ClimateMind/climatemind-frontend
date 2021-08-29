import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { loginResponse, postLogin } from '../../api/postLogin';
import { postLogout } from '../../api/postLogout';
import { refreshResponse } from '../../api/postRefresh';
import ROUTES from '../../components/Router/RouteConfig';
import { AuthContext, AuthDispatch, emptyUser } from '../../contexts/auth';
import { TAuth } from '../../types/Auth';
import { useSession } from '../useSession';
import { useToast } from '../useToast';
import { useRefresh } from './useRefresh';

interface userLogin {
  email: string;
  password: string;
  recaptchaToken: string;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  const setAuth = useContext(AuthDispatch);
  const { showToast } = useToast();
  const { push } = useHistory();
  const { clearSession, setQuizId } = useSession();
  const { fetchRefreshToken } = useRefresh();

  const { isLoggedIn, accessToken } = auth;

  // Call refresh on load on load to see if the user has a valid refresh token
  useEffect(() => {
    const refreshToken = async () => {
      // if not logged in call refresh token
      if (!isLoggedIn && !accessToken) {
        // See if we can refresh the token token
        try {
          const response = await fetchRefreshToken();
          setUserFromResponse(response);
          setQuizId(response.user.quiz_id);
        } catch (err) {
          console.error(err);
        }
      }
      // Refresh the token every 14.5minutes
    };
    refreshToken();

    const timer = setInterval(async () => {
      const response = await fetchRefreshToken();
      setAccessToken(response.access_token);
    }, 870000); // 14mins 30seconds 870000

    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, []);

  const mutateLogin = useMutation(
    (loginCreds: userLogin) => postLogin(loginCreds),
    {
      onError: (error: any) => {
        showToast({
          message: error.response?.data?.error || 'Error',
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
        setUserContext(user);

        if (response.user.quiz_id) {
          setQuizId(response.user.quiz_id);
        } else {
          showToast({
            message: 'Error no session id',
            type: 'error',
          });
        }

        // Redirect the user to the climate feed
        push(ROUTES.ROUTE_FEED);
      },
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

  // Take the api response from login/register/refresh and set the user
  const setUserFromResponse = (response: refreshResponse) => {
    const currentUser = {
      firstName: response.user.first_name,
      lastName: response.user.last_name,
      email: response.user.email,
      userIntials: response.user.first_name[0] + response.user.last_name[0],
      accessToken: response.access_token,
      userId: response.user.user_uuid,
      isLoggedIn: true,
      quizId: response.user.quiz_id,
    };
    setUserContext(currentUser);
  };

  const setUserContext = (user: TAuth) => {
    if (setAuth) {
      setAuth(user);
    }
  };

  const setAccessToken = (accessToken: string) => {
    if (setAuth) {
      setAuth((prevState) => {
        return {
          ...prevState,
          accessToken,
        };
      });
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

  const login = async ({ email, password, recaptchaToken }: userLogin) => {
    // Call the api
    await mutateLogin.mutateAsync({
      recaptchaToken,
      email,
      password,
    });
  };

  return {
    auth,
    accessToken,
    setUserContext,
    setUserFromResponse,
    login,
    logout,
    isLoggedIn,
  };
}
