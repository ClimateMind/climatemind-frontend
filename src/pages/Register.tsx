import { Box, createStyles, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import React from 'react';
import ROUTES from '../components/Router/RouteConfig';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Wrapper from '../components/Wrapper';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import { useRegister } from '../hooks/useRegister';
import { useFormik } from 'formik';
import { registerSchema } from '../helpers/validationSchemas';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
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

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      register({
        username: values.username,
        email: values.email,
        password: values.password,
      });
    },
  });

  const { register } = useRegister();

  const passwordsMatch =
    formik.values.password === formik.values.confirmPassword;

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT5} fullHeight={true}>
        <PageContent>
          <PageTitle variant="h1">Register</PageTitle>

          <form className={classes.form} onSubmit={formik.handleSubmit}>
            <Box py={4}>
              <TextInput
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="hello123"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />

              <TextInput
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
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
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
                  Register
                </Button>
              </Box>
            </Box>
          </form>

          <Box textAlign="center">
            <Typography variant="body1">
              Already registered? <Link to={ROUTES.ROUTE_LOGIN}>Login</Link>
            </Typography>
          </Box>
        </PageContent>
      </Wrapper>
    </>
  );
};

export default RegistrationPage;
