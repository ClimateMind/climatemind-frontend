import { Box, Button, Typography } from '@material-ui/core';
import ROUTES from '../components/Router/RouteConfig';
import Loader from '../components/Loader';
import PageContent from '../components/PageContent';
import TextInput from '../components/TextInput';
import { resetPasswordSchema } from '../helpers/validationSchemas';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { usePasswordResetLink } from '../hooks/usePasswordResetLink';
import { useFormik } from 'formik';
import { useToast } from '../hooks/useToast';
import { useSession } from '../hooks/useSession';
import postSession from '../api/postSession';
import { useErrorLogging } from '../hooks/useErrorLogging';

type UrlParamType = {
  passwordResetLinkUuid: string;
};

const PasswordReset: React.FC = () => {
  const history = useHistory();

  const { setSessionId } = useSession();
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
      passwordResetLinkUuid,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    })
      .then(() => {
        history.push(ROUTES.ROUTE_LOGIN);
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

  const passwordsMatch =
    formik.values.newPassword === formik.values.confirmPassword;

  const confirmPasswordCheck = () => {
    if (!passwordsMatch) {
      return 'Passwords must match!';
    } else {
      return formik.touched.confirmPassword && formik.errors.confirmPassword;
    }
  };

  // When the page loads, we evaluate the uuid from the url to see if the reset link is valid or not
  useEffect(() => {
    postSession().then((res) => {
      setSessionId(res.sessionId);
      verifyPasswordResetLink({ passwordResetLinkUuid })
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

  if (!linkIsValid) {
    return (
      <div style={{ textAlign: 'center', marginTop: '200px' }}>
        <Typography variant="body1">
          Your password reset link has expired, please request a new one.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: '2em 0 1.5em' }}
          onClick={() => history.push(ROUTES.ROUTE_LOGIN)}
        >
          Back to login
        </Button>
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
            <Typography variant="h4" align="center">
              Reset your password
            </Typography>
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
                helperText={
                  formik.touched.newPassword && formik.errors.newPassword
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

              <Box component="div" textAlign="center" py={2}>
                <Button
                  variant="contained"
                  disabled={!(formik.dirty && formik.isValid && passwordsMatch)}
                  color="primary"
                  onClick={() => formik.handleSubmit}
                  type="submit"
                  disableElevation
                  data-testid="generate-link-button"
                >
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </PageContent>
      </div>
    );
  }
};

export default PasswordReset;
