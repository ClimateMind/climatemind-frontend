import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';

import ROUTES from '../../router/RouteConfig';
import { AuthContext, AuthDispatch, emptyUser } from '../../contexts/auth';
import { TAuth } from '../../types/Auth';
import { useSession } from '../useSession';
// import { useToast } from '../useToast';
import { useErrorLogging } from '../useErrorLogging';
import { ClimateApi } from '../../api/ClimateApi';
import { PostLoginRequest } from '../../api/requests';

export function useAuth() {
  const auth = useContext(AuthContext);
  const setAuth = useContext(AuthDispatch);
  // const { showToast } = useToast();
  const navigate = useNavigate();
  const { clearSession, setQuizId, sessionId } = useSession();
  const { logError } = useErrorLogging();
  const { isLoggedIn, accessToken, isLoading } = auth;
  const location = useLocation();

  // const mutateLogin = useMutation(
  //   (loginCreds: userLogin) => new ClimateApi(sessionId, accessToken).postLogin(loginCreds.email, loginCreds.password, loginCreds.recaptchaToken),
  //   {
  //     onError: (error: any) => {
  //       console.log("HERE IS AN ERROR");
  //       console.log(error);
  //       showToast({
  //         message:
  //           error.response?.data?.error ||
  //           'The email and password entered don’t match. Please try again.',
  //         type: 'error',
  //       });
  //       logError(error);
  //     },
  //     onSuccess: async (response: PostLoginResponse) => {
  //       // Show notifications
  //       showToast({
  //         message: `Welcome back, ${response.user.first_name}!`,
  //         type: 'success',
  //       });
  //       // Set the login state
  //       const user = {
  //         firstName: response.user.first_name,
  //         lastName: response.user.last_name,
  //         email: response.user.email,
  //         userIntials: response.user.first_name[0] + response.user.last_name[0],
  //         accessToken: response.access_token,
  //         userId: response.user.user_uuid,
  //         isLoggedIn: true,
  //         quizId: response.user.quiz_id,
  //         isLoading: false,
  //       };
  //       setUserContext(user);

  //       if (response.user.quiz_id) {
  //         setQuizId(response.user.quiz_id);
  //       } else {
  //         showToast({
  //           message: 'Error no session id',
  //           type: 'error',
  //         });
  //         logError('Error no session id');
  //       }

  //       if (location.state?.to) {
  //         push(location.state.to);
  //       } else if (location.state?.from) {
  //         push(location.state.from);
  //       } else {
  //         // Redirect the user to the climate feed
  //         push(ROUTES.ROUTE_FEED);
  //       }
  //     },
  //   }
  // );

  const mutateLogout = useMutation(
    () => new ClimateApi(sessionId, accessToken).postLogout(),
    {
      onError: (error) => {
        // showToast({
        //   message: 'Error logging out',
        //   type: 'error',
        // });
        logError(error);
      },
      onSuccess: async () => {
        // Show notifications
        // showToast({
        //   message: `Goodbye!`,
        //   type: 'success',
        // });
        navigate(ROUTES.HOME_PAGE);
      },
    }
  );

  const setUserContext = (user: TAuth) => {
    if (setAuth) {
      setAuth(user);
    }
  };

  const logout = async () => {
    // Clear out user details from state
    await mutateLogout.mutateAsync();
    if (setAuth) {
      setAuth(emptyUser);
    }
    clearSession();
    // Unset the refresh token cookie.
  };

  const login2 = async ({
    email,
    password,
    recaptchaToken,
  }: PostLoginRequest) => {
    new ClimateApi(sessionId, accessToken)
      .postLogin({ email, password, recaptchaToken })
      .then((response) => {
        console.log('LOGIN RESPONSE START');
        console.log(response.user.first_name);
        console.log('LOGIN RESPONSE END');

        // showToast({
        //   message: `Welcome back, ${response.user.first_name}!`,
        //   type: 'success',
        // });
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
          isLoading: false,
        };
        setUserContext(user);

        if (response.user.quiz_id) {
          setQuizId(response.user.quiz_id);
        } else {
          // showToast({
          //   message: 'Error no session id',
          //   type: 'error',
          // });
          logError('Error no session id');
        }

        if (location.state?.to) {
          navigate(location.state.to);
        } else if (location.state?.from) {
          navigate(location.state.from);
        } else {
          // Redirect the user to the climate feed
          navigate(ROUTES.CLIMATE_FEED_PAGE);
        }
      })
      .catch((error) => {
        console.log('HERE IS AN ERROR');
        console.log(error);
        // showToast({
        //   message:
        //     error.response?.data?.error ||
        //     'The email and password entered don’t match. Please try again.',
        //   type: 'error',
        // });
        logError(error);
      });
  };

  // const login = async ({ email, password, recaptchaToken }: userLogin) => {
  //   // Call the api
  //   await mutateLogin.mutateAsync({
  //     recaptchaToken,
  //     email,
  //     password,
  //   });
  // };

  return {
    auth,
    setAuth,
    accessToken,
    isLoading,
    login2,
    logout,
    setUserContext,
    isLoggedIn,
  };
}
