import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ROUTES from '../../router/RouteConfig';
import { analyticsService, RegistrationPageOpenEvent } from 'services';
import { useAppSelector } from 'store/hooks';
import { CmTypography, Page, PageContent } from 'shared/components';
import { SignUpForm, useSignUp } from 'features/auth';
import { LoginForm, RequestPasswordResetModal, useLogin, useResetPassword, loginUserA } from 'features/auth';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'store/hooks';

function SignUpPage() {
  const signUpId = uuidv4();
  const navigate = useNavigate();

  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { signUp } = useSignUp();
  const { sessionId, quizId } = useAppSelector((state) => state.auth.userA);

  async function signUpHandler(firstname: string, lastname: string, email: string, password: string) {
    setIsLoading(true);
    const success = await signUp(firstname, lastname, email, password, quizId);
    if (success) navigate(ROUTES.CLIMATE_FEED_PAGE);
    setIsLoading(false);
  }

  useEffect(() => {
    if (sessionId) analyticsService.postEvent(RegistrationPageOpenEvent, signUpId);
  }, [sessionId, signUpId]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get('access_token');
    // const refresh_token = urlParams.get('refresh_token');
    const first_name = Cookies.get('first_name');
    const last_name = Cookies.get('last_name');
    const email = Cookies.get('email');
    const user_id = Cookies.get('user_id');
    const quiz_id = Cookies.get('quiz_id');

    if (access_token) {
      //this sets the access token to be reused in the future
      Cookies.set('accessToken', access_token, { secure: true });

      // when dispatched, the userA slice will be updated with the new user info and loggedin is set to true
      // when loggein is true, the user is redirected to the climate feed page using the authorized page and the outlet

      dispatch(
        loginUserA({
          firstName: first_name as string,
          lastName: last_name as string,
          email: email as string,
          quizId: quiz_id as string,
          userId: user_id as string,
        })
      );

      navigate(ROUTES.CLIMATE_FEED_PAGE);
    } else {
      console.error('No access token found');
    }
  }, [location.search]);
  return (
    <Page>
      <PageContent>
        <CmTypography variant="h1">Create a Climate Mind account</CmTypography>
        <CmTypography variant="h4" style={{ margin: 0 }}>
          Save your results, see your climate topics, and start talking.
        </CmTypography>

        <SignUpForm isLoading={isLoading} onSignUp={signUpHandler} />
      </PageContent>
    </Page>
  );
}

export default SignUpPage;
