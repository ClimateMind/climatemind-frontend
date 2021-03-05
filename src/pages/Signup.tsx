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
import BottomMenu from '../components/BottomMenu';
import { useForm } from '../hooks/useForm';

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

const SignUpPage: React.FC = () => {
  const classes = useStyles();

  const { values, updateValue } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleRegister = () => {
    console.log('form has been submitted');
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
                <Typography variant="h4">Sign Up</Typography>
              </Grid>
            </Box>
          </Grid>

          <form onSubmit={handleRegister}>
            {/* {status === 'sending' && <Loader />} */}
            <Box py={4}>
              <TextInput
                name="firstName"
                label="First Name"
                value={values.firstName}
                onChange={(e) => updateValue(e)}
                placeholder="Greta"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
              />

              <TextInput
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={updateValue}
                placeholder="Thunberg"
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

              <Box py={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRegister}
                  type="submit"
                >
                  Sign Up
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

export default SignUpPage;
