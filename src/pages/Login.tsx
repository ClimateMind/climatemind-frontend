import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Wrapper from '../components/Wrapper';
import { COLORS } from '../common/styles/CMTheme';
import BottomMenu from '../components/BottomMenu';
import { useForm } from '../hooks/useForm';
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

interface Form {
  email: string;
}

const LoginPage: React.FC = () => {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  const { values, updateValue } = useForm({
    email: '',
    password: '',
  });

  const { login } = useAuth();

  const handleLogin = () => {
    console.log('form has been submitted');
    setSubmitted(true);
    login();
  };

  if (submitted)
    return (
      <Wrapper>
        <Typography variant="h4">Processing</Typography>
      </Wrapper>
    );

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
                <Typography variant="h4">Sign Up</Typography>
              </Grid>
            </Box>
          </Grid>

          <form onSubmit={handleLogin}>
            {/* {status === 'sending' && <Loader />} */}
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
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
      <BottomMenu />
    </>
  );
};

export default LoginPage;
