import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { loginResponse, postLogin } from '../../api/postLogin';
import { refreshResponse } from '../../api/postRefresh';
import { postLogout } from '../../api/postLogout';
import ROUTES from '../../components/Router/RouteConfig';
import { AuthContext, AuthDispatch, emptyUser } from '../../contexts/auth';
import { getInitials } from '../../helpers/getInitials';
import { useSession } from '../useSession';
import { useToast } from '../useToast';
import { TAuth } from '../../types/Auth';
import { useRefresh } from './useRefresh';

interface userLogin {
  email: string;
  password: string;
}

export function useAuth() {
  const auth = useContext(AuthContext);
  const setAuth = useContext(AuthDispatch);
  const { showToast } = useToast();
  const { push } = useHistory();
  const { clearSession, setSessionId } = useSession();
  const { fetchRefreshToken } = useRefresh();

  const { isLoggedIn, accessToken } = auth;

  // Call refresh on load on load to see if the user has a valid refresh token
  useEffect(() => {
    const refreshToken = async () => {
      // if not logged in call refresh token
      if (!isLoggedIn && !accessToken) {
        console.log('Auth hook did mount... ');
        // See if we can refresh the token token
        try {
          const response = await fetchRefreshToken();
          setUserFromResponse(response);
          setOldSessionId(response.user.session_id);
        } catch (err) {
          console.log(err);
        }
      }
    };
    refreshToken();

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
          message: `Welcome, ${response.user.full_name}`,
          type: 'success',
        });

        // Set the login state
        const user = {
          fullName: response.user.full_name,
          email: response.user.email,
          userIntials: getInitials(response.user.full_name),
          accessToken: response.access_token,
          userId: response.user.user_uuid,
          isLoggedIn: true,
          sessionId: response.user.session_id,
        };
        setUserContext(user);
        // TODO: Set the session id for the logged in user
        if (response.user.session_id) {
          setSessionId(response.user.session_id);
        } else {
          showToast({
            message: 'Error no session id',
            type: 'error',
          });
        }

        // Refresh the token every 14.5minutes
        setInterval(async () => {
          const response = await fetchRefreshToken();
          setAccessToken(response.access_token);
        }, 5000); // 14mins 30seconds 870000

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
      fullName: response.user.full_name,
      email: response.user.email,
      userIntials: getInitials(response.user.full_name),
      accessToken: response.access_token,
      userId: response.user.user_uuid,
      isLoggedIn: true,
      sessionId: response.user.session_id,
    };
    setUserContext(currentUser);
  };

  // TODO: this is to changed once the session id is to be updated to be given on app load
  const setOldSessionId = (sessionId: string | null) => {
    if (sessionId !== null) {
      setSessionId(sessionId);
    } else {
      showToast({
        message: 'Error no session id',
        type: 'error',
      });
    }
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

  const login = async ({ email, password }: userLogin) => {
    // Call the api
    await mutateLogin.mutateAsync({
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
