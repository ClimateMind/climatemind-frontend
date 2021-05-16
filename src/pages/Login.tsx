import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import TextInput from '../components/TextInput';
import Wrapper from '../components/Wrapper';
import { loginSchema } from '../helpers/validationSchemas';
import { useAuth } from '../hooks/useAuth';

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

              <Box py={2} textAlign="center">
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
        </PageContent>
      </Wrapper>
    </>
  );
};

export default LoginPage;
