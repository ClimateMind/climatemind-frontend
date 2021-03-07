import React from 'react';
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
import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
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

  const { register, isLoading, isError, isSuccess } = useRegister();

  const { push } = useHistory();

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
                <Typography variant="h4">Register</Typography>
              </Grid>
            </Box>
          </Grid>

          {!isSuccess && (
            <form onSubmit={handleSignUp}>
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

                <Box py={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSignUp}
                    type="submit"
                  >
                    Log In
                  </Button>
                </Box>
              </Box>
            </form>
          )}

          {isSuccess && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => push('/account')}
            >
              View my account
            </Button>
          )}

          <div className="msgBox">
            {isLoading && <Typography variant="body1">Logging In</Typography>}
            {isError && (
              <Typography variant="body1">Unable to log in</Typography>
            )}
          </div>
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
    </>
  );
};

export default RegistrationPage;
