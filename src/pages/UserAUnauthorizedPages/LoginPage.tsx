import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box } from '@mui/material';

import { ReactComponent as Logo } from '../../assets/cm-logo.svg';
import ROUTES from '../../router/RouteConfig';
import { loginSchema } from '../../helpers/validationSchemas';
import { useAuth } from '../../hooks/auth/useAuth';
import { getAppSetting } from '../../getAppSetting';
import { usePasswordResetLink } from '../../hooks/usePasswordResetLink';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { CmButton, CmTextInput, CmTypography, Page, PageContent } from 'shared/components';
import { useToastMessage } from 'shared/hooks';
import { RequestPasswordResetModal } from 'features/auth/components';

function LoginPage() {
  const { showErrorToast } = useToastMessage();
  const { logMessage } = useErrorLogging();
  const REACT_APP_RECAPTCHA_SITEKEY = getAppSetting(
    'REACT_APP_RECAPTCHA_SITEKEY'
  ); // Will fall back to test key in CI when not present on the window

  const [isPwdResetModal, setIsPwdResetModal] = useState<boolean>(false);
  const { sendPasswordResetLink } = usePasswordResetLink();

  const onConfirmPwdResetData = async (email: string) => {
    setIsPwdResetModal(false);
    await sendPasswordResetLink({ email });
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
        showErrorToast('No token returned, click the recaptcha again!')
        logMessage('No token returned, click the recaptcha again!');
        setRecaptchaToken(null);
        return;
      }
      login2({ recaptchaToken, ...values });
    },
  });

  async function onChange(token: string | null) {
    if (!token) {
      showErrorToast('No token returned, click the recaptcha again!')
      logMessage('No token returned, click the recaptcha again!');
      setRecaptchaToken(null);
      return;
    }
    setRecaptchaToken(token);
  }

  return (
    <Page>
      <PageContent>
        <RequestPasswordResetModal isOpen={isPwdResetModal} onClose={() => setIsPwdResetModal(false)} onSubmit={onConfirmPwdResetData} />

        <Box mt={6} textAlign="center">
          <Logo style={{ maxWidth: '110px' }} />
        </Box>

        <CmTypography variant="h1">Climate Mind</CmTypography>
        <CmTypography variant="h3">Sign In</CmTypography>

        <form onSubmit={formik.handleSubmit}>
          <Box py={4}>
            <CmTextInput
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
              style={{ marginBottom: 20 }}
            />

            <CmTextInput
              id="password"
              name="password"
              label="Password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              placeholder="Super Secret Password"
              fullWidth={true}
              variant="filled"
              color="secondary"
              margin="none"
              type="password"
            />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 30 }}>
              <CmTypography variant="body">Forgot your password?</CmTypography>
              <CmButton variant='text' text='Send reset link' onClick={() => setIsPwdResetModal(true)} style={{ textTransform: 'none' }} />
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
    </Page>
  );
}

export default LoginPage;
