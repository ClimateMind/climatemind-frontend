import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box } from '@mui/material';

import { ReactComponent as Logo } from '../../assets/cm-logo.svg';
import ROUTES from '../../router/RouteConfig';
import PageContent from '../../components/PageContent';
import TextInput from '../../components/TextInput';
import Wrapper from '../../components/Wrapper';
import { loginSchema } from '../../helpers/validationSchemas';
import { useAuth } from '../../hooks/auth/useAuth';
import { getAppSetting } from '../../getAppSetting';
import { useToast } from '../../hooks/useToast';
import { TAlert } from '../../types/Alert';
import RequestPasswordResetForm from '../../components/RequestPasswordResetForm';
import { usePasswordResetLink } from '../../hooks/usePasswordResetLink';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { CmButton, CmTypography } from 'shared/components';

type postPasswordResetLinkPayload = {
  email: string;
};

const recaptchaFailedMsg: TAlert = {
  message: 'No token returned, click the recaptcha again!',
  type: 'error',
};

function LoginPage() {
  const { showToast } = useToast();
  const { logMessage } = useErrorLogging();
  const REACT_APP_RECAPTCHA_SITEKEY = getAppSetting(
    'REACT_APP_RECAPTCHA_SITEKEY'
  ); // Will fall back to test key in CI when not present on the window

  const [isPwdResetModal, setIsPwdResetModal] = useState<boolean>(false);
  const { sendPasswordResetLink } = usePasswordResetLink();

  const onConfirmPwdResetData = async (
    values: postPasswordResetLinkPayload
  ) => {
    setIsPwdResetModal(false);
    await sendPasswordResetLink(values);
  };

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const { login2, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    navigate(ROUTES.CLIMATE_FEED_PAGE);
  }

  // Set initial form values and handle submission
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      if (!recaptchaToken) {
        showToast(recaptchaFailedMsg);
        logMessage(recaptchaFailedMsg.message);
        setRecaptchaToken(null);
        return;
      }
      login2({ recaptchaToken, ...values });
    },
  });

  async function onChange(token: string | null) {
    if (!token) {
      showToast(recaptchaFailedMsg);
      logMessage(recaptchaFailedMsg.message);
      setRecaptchaToken(null);
      return;
    }
    setRecaptchaToken(token);
  }

  return (
    <>
      <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight={true}>
        <PageContent>
          <RequestPasswordResetForm
            handleClose={() => setIsPwdResetModal(false)}
            onConfirm={onConfirmPwdResetData}
            isOpenModal={isPwdResetModal}
          />

          <Box mt={6} textAlign="center">
            <Logo style={{ maxWidth: '110px' }} />
          </Box>

          <CmTypography variant="h1">Climate Mind</CmTypography>
          <CmTypography variant="h3">Sign In</CmTypography>

          <form onSubmit={formik.handleSubmit}>
            <Box py={4}>
              <TextInput
                name="email"
                id="email"
                label="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="hello@climatemind.org"
                fullWidth={true}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="filled"
                color="secondary"
                margin="none"
              />

              <TextInput
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                placeholder="Super Secret Password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
              />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CmTypography variant="body">
                  Forgot your password? &emsp;{' '}
                  <button
                    type="button"
                    onClick={() => setIsPwdResetModal(true)}
                    style={{
                      display: 'inline',
                      textDecoration: 'underline',
                      border: 'none',
                      color: 'inherit',
                      font: 'inherit',
                      background: 'none',
                    }}
                  >
                    <CmTypography variant='label'>Send reset link</CmTypography>
                  </button>
                </CmTypography>
              </div>
              <br></br>

              <Box py={2} style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
                <ReCAPTCHA
                  sitekey={REACT_APP_RECAPTCHA_SITEKEY}
                  onChange={onChange}
                />
              </Box>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CmButton
                  text='Log In'
                  disabled={!(formik.dirty && formik.isValid) || !recaptchaToken}
                  onClick={formik.handleSubmit}
                />
              </div>
            </Box>
          </form>
        </PageContent>
      </Wrapper>
    </>
  );
}

export default LoginPage;
