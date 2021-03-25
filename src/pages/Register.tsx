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
import { useForm } from '../hooks/useForm';
import { useRegister } from '../hooks/useRegister';

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
  const { values, updateValue } = useForm({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { register } = useRegister();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const userDetails = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    register(userDetails);
  };

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT5} fullHeight={true}>
        <PageContent>
          <PageTitle variant="h1">Register</PageTitle>

          <form className={classes.form} onSubmit={handleSignUp}>
            <Box py={4}>
              <TextInput
                name="username"
                label="Username"
                value={values.username}
                onChange={updateValue}
                placeholder="hello123"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
              />

              <TextInput
                name="email"
                label="Email"
                value={values.email}
                onChange={updateValue}
                placeholder="hello@climatemind.org"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
              />

              <TextInput
                name="password"
                label="Password"
                value={values.password}
                onChange={updateValue}
                placeholder="Super Secret Password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
              />

              <TextInput
                name="password2"
                label="Verify Password"
                value={values.password2}
                onChange={updateValue}
                placeholder="Verify Password"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
                type="password"
              />

              <Box pt={4} pb={2} textAlign="center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSignUp}
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
