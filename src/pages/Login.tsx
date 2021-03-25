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
import * as yup from 'yup';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
    },
  })
);

// Login Form Validation Schema
const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(2, 'Username must be at least 2 characters long'),
  password: yup
    .string()
    .required()
    .min(2, 'Password must be at least 2 characters long'),
});

// LoginPage Component
const LoginPage: React.FC = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login({
      username: formik.values.username,
      password: formik.values.password,
    });
  };

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT4} fullHeight={true}>
        <PageContent>
          <PageTitle variant="h1">Sign In</PageTitle>

          <form className={classes.root} onSubmit={handleLogin}>
            <Box py={4}>
              <TextInput
                name="username"
                label="Username"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="hello@climatemind.org"
                fullWidth={true}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
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
                  onClick={() => handleLogin}
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
