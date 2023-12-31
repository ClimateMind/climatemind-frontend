import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import ROUTES from '../../router/RouteConfig';
import Loader from '../../components/Loader';
import PageContent from '../../components/PageContent';
import TextInput from '../../components/TextInput';
import { resetPasswordSchema } from '../../helpers/validationSchemas';
import { usePasswordResetLink } from '../../hooks/usePasswordResetLink';
import { useFormik } from 'formik';
import { useToast } from '../../hooks/useToast';
import { useSession } from '../../hooks/useSession';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { useAuth } from '../../hooks/auth/useAuth';
import { ClimateApi } from '../../api/ClimateApi';
import { CmButton, CmTypography } from 'shared/components';

type UrlParamType = {
  passwordResetLinkUuid: string;
};

function PasswordResetPage() {
  const navigate = useNavigate();

  const { setSessionId, sessionId } = useSession();
  const { accessToken } = useAuth();
  const { showToast } = useToast();
  const { logError } = useErrorLogging();

  const { passwordResetLinkUuid } = useParams<UrlParamType>();
  const { verifyPasswordResetLink, resetPassword } = usePasswordResetLink();

  const [isBusy, setBusy] = useState(true);
  const [linkIsValid, setLinkIsValid] = useState(false);

  const onConfirm = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    resetPassword({
      passwordResetLinkUuid: passwordResetLinkUuid ?? '',
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    })
      .then(() => {
        navigate(ROUTES.LOGIN_PAGE);
      })
      .catch((err) => {
        showToast({
          message: 'Resetting the password failed',
          type: 'error',
        });
        logError(err);
      });
  };

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values: any) => {
      onConfirm(values);
    },
  });

  const passwordsMatch = formik.values.newPassword === formik.values.confirmPassword;

  const confirmPasswordCheck = () => {
    if (!passwordsMatch) {
      return <CmTypography variant='label'>Passwords must match!</CmTypography>;
    } else {
      return <></>;
    }
  };

  // When the page loads, we evaluate the uuid from the url to see if the reset link is valid or not
  useEffect(() => {
    new ClimateApi(sessionId, accessToken).postSession().then((res) => {
      setSessionId(res.sessionId);
      verifyPasswordResetLink(passwordResetLinkUuid ?? '')
        .then(() => {
          setLinkIsValid(true);
          setBusy(false);
        })
        .catch(() => setBusy(false));
    });
    // eslint-disable-next-line
  }, [passwordResetLinkUuid]);

  // As long as the verification isn't finished, we display nothing
  if (isBusy) {
    return <Loader />;
  }

  if (linkIsValid) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '200px' }}>
        <CmTypography variant="body">
          Your password reset link has expired, please request a new one.
        </CmTypography>
        <CmButton
          text='Back to login'
          onClick={() => navigate(ROUTES.LOGIN_PAGE)}
          style={{ marginTop: 20 }}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PageContent>
          <Box mt={8} py={4}>
            <CmTypography variant="h2">
              Reset your password
            </CmTypography>
            <form onSubmit={formik.handleSubmit}>
              <TextInput
                id="newPassword"
                name="newPassword"
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.newPassword &&
                  Boolean(formik.errors.newPassword)
                }
                placeholder="New password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
              />

              <TextInput
                id="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm new password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
                error={
                  formik.touched.confirmPassword &&
                  (Boolean(formik.errors.confirmPassword) || !passwordsMatch)
                }
                helperText={
                  formik.touched.confirmPassword && confirmPasswordCheck()
                }
              />

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <CmButton
                  text='Save'
                  onClick={formik.handleSubmit}
                  disabled={!(formik.dirty && formik.isValid && passwordsMatch)}
                />
              </div>
            </form>
          </Box>
        </PageContent>
      </div>
    );
  }
}

export default PasswordResetPage;
