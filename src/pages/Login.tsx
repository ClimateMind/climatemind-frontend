import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import { COLORS } from '../common/styles/CMTheme';
import ROUTES from '../components/Router/RouteConfig';
import Button from '../components/Button';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import TextInput from '../components/TextInput';
import Wrapper from '../components/Wrapper';
import { loginSchema } from '../helpers/validationSchemas';
import { useAuth } from '../hooks/auth/useAuth';
import { getAppSetting } from '../getAppSetting';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
    },
    recaptchaContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

// LoginPage Component
const LoginPage: React.FC = () => {
  const classes = useStyles();
  const REACT_APP_RECAPTCHA_SITEKEY = getAppSetting(
    'REACT_APP_RECAPTCHA_SITEKEY'
  ); // Will fall back to test key in CI when not present on the window

  const [isVerified, setIsVerified] = useState<boolean>(false);

  const { login, isLoggedIn } = useAuth();
  const { push } = useHistory();

  if (isLoggedIn) {
    push(ROUTES.ROUTE_FEED);
  }

  // Set initial form values and handle submission
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  function onChange() {
    setIsVerified(true);
  }

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT6} fullHeight={true}>
        <PageContent>
          <Box mt={6} textAlign="center">
            <Logo style={{ maxWidth: '110px' }} />
          </Box>

          <PageTitle variant="h1">Climate Mind</PageTitle>
          <Typography variant="h6" align="center">
            Sign In
          </Typography>

          <form className={classes.root} onSubmit={formik.handleSubmit}>
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

              <Box py={2} className={classes.recaptchaContainer}>
                <ReCAPTCHA
                  sitekey={REACT_APP_RECAPTCHA_SITEKEY}
                  onChange={onChange}
                />
              </Box>

              <Box py={2} textAlign="center">
                <Button
                  variant="contained"
                  disabled={!(formik.dirty && formik.isValid) || !isVerified}
                  color="primary"
                  onClick={() => formik.handleSubmit}
                  type="submit"
                  disableElevation
                >
                  Log In
                </Button>
              </Box>
            </Box>
          </form>
        </PageContent>
      </Wrapper>
    </>
  );
};

export default LoginPage;
