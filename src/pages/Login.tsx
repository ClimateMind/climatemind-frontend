import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import ROUTES from '../components/Router/RouteConfig';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
    },
  })
);

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const { values, updateValue } = useForm({
    email: '',
    password: '',
  });

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    login({ username: values.email, password: values.password });
  };

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT4} fullHeight={true}>
        <Grid item sm={false} lg={4}>
          {/* left gutter */}
        </Grid>

        <Grid
          xs={12}
          sm={10}
          md={4}
          item
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          className={classes.root}
        >
          <Grid item>
            <Box pt={5}>
              <Grid item xs={9}>
                <Typography variant="h4">Sign In</Typography>
              </Grid>
            </Box>
          </Grid>

          <form onSubmit={handleLogin}>
            <Box py={4}>
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

              <Box py={2}>
                <Button
                  variant="contained"
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
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
    </>
  );
};

export default LoginPage;
