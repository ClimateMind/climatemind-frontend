import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import TextInput from '../components/TextInput';
import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/useAuth';
import ROUTES from '../components/Router/RouteConfig';
import { useFormik } from 'formik';
import { loginSchema } from '../helpers/validationSchemas';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
    },
  })
);

// LoginPage Component
const LoginPage: React.FC = () => {
  const classes = useStyles();
  const { login } = useAuth();

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

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT6} fullHeight={true}>
        <PageContent>
          <PageTitle variant="h1">Sign In</PageTitle>

          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <Box py={4}>
              <TextInput
                name="email"
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

              <Box py={2}>
                <Button
                  variant="contained"
                  disabled={!(formik.dirty && formik.isValid)}
                  color="primary"
                  onClick={() => formik.handleSubmit}
                  type="submit"
                >
                  Log In
                </Button>
              </Box>
            </Box>
          </form>
          <Typography variant="body1">
            Not registered? <Link to={ROUTES.ROUTE_REGISTER}>Sign Up</Link>
          </Typography>
        </PageContent>
      </Wrapper>
    </>
  );
};

export default LoginPage;
