import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ROUTES from '../components/Router/RouteConfig';
import { useHistory } from 'react-router-dom';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import TextInput from '../components/TextInput';
import Wrapper from '../components/Wrapper';
import { registerSchema } from '../helpers/validationSchemas';
import { useRegister } from '../hooks/auth/useRegister';
import { useSession } from '../hooks/useSession';
import { useAuth } from '../hooks/auth/useAuth';
import { addSignUpPageLoadToDataLayer } from '../analytics';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
    },
    skipButton: {
      color: COLORS.DK_TEXT,
      marginTop: '16px',
    },
    form: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10em',
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
    },
  })
);

const RegistrationPage: React.FC = () => {
  const classes = useStyles();
  const { register } = useRegister();
  const { push } = useHistory();
  const { sessionId, quizId } = useSession();
  const { isLoggedIn } = useAuth();
  const signUpId = uuidv4();

  useEffect(() => {
    if (sessionId) addSignUpPageLoadToDataLayer(signUpId, sessionId);
    // eslint-disable-next-line
  }, []);

  // if a logged in user is doing the quiz again they should be redirected away from this page
  if (isLoggedIn) {
    push(ROUTES.ROUTE_FEED);
  }

  // Formik used for form validation and submission
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      // Register user
      register({
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        password: values.password,
        quizId,
      });
    },
  });

  const passwordsMatch =
    formik.values.password === formik.values.confirmPassword;

  const confirmPasswordCheck = () => {
    if (!passwordsMatch) {
      return 'Passwords must match!';
    } else {
      return formik.touched.confirmPassword && formik.errors.confirmPassword;
    }
  };

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT5} fullHeight={true}>
        <PageContent>
          <PageTitle variant="h1">Create a Climate Mind account</PageTitle>
          <Typography variant="h6" align="center">
            Save your results and access your climate feed anytime.
          </Typography>

          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Box py={4}>
              <TextInput
                id="firstname"
                name="firstname"
                label="First Name"
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="John"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />

              <TextInput
                id="lastname"
                name="lastname"
                label="Last Name"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Smith"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
              />

              <TextInput
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="hello@climatemind.org"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextInput
                id="password"
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Super Secret Password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
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

              <Box pt={4} pb={2} textAlign="center">
                <Button
                  variant="contained"
                  disabled={!(formik.dirty && formik.isValid && passwordsMatch)}
                  color="primary"
                  onClick={() => formik.handleSubmit}
                  type="submit"
                >
                  Create Account and go to feed
                </Button>
              </Box>

              <Box>
                <Typography variant="body1" align="center">
                  By creating an account you can access your Climate Personality
                  and Climate Feed on any computer
                </Typography>
              </Box>

              <Box textAlign="center">
                <Button
                  color="primary"
                  onClick={() => push('/climate-feed')}
                  className={classes.skipButton}
                >
                  Skip making an account and see feed
                </Button>
              </Box>
            </Box>
          </form>
        </PageContent>
      </Wrapper>
    </>
  );
};

export default RegistrationPage;
