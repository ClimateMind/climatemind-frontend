import React, { useState } from 'react';
import { Button } from './Button';
import TextInput from './TextInput';
import { Box, makeStyles, createStyles } from '@material-ui/core';
import Loader from './Loader';
import { Typography } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import { isValidEmail } from '../helpers/emailAddress';
import { postSubscriber } from '../api/postSubscriber';
import { useMutation } from 'react-query';
import { useSession } from '../hooks/useSession';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      boxSizing: 'border-box',
    },
    msgBox: {
      backgroundColor: COLORS.PRIMARY,
      margin: '16px 0',
      padding: '16px',
      borderRadius: '5px',
      '& a': {
        color: COLORS.SECONDARY,
      },
    },
    error: {
      color: COLORS.ERROR,
    },
    success: {
      color: COLORS.SUCCESS,
    },
    formButton: {
      textAlign: 'center',
    },
  })
);

// Sucess Error Components - Displayed after form submits
const SuccessDiv = () => {
  const classes = useStyles();
  return (
    <div className={classes.msgBox}>
      <Typography className={classes.success} variant="h6">
        Success
      </Typography>
      <Typography variant="body1" component="div">
        Thanks for subscribing
      </Typography>
    </div>
  );
};

const ErrorDiv = () => {
  const classes = useStyles();
  return (
    <div className={classes.msgBox}>
      <Typography className={classes.error} variant="h6">
        Error
      </Typography>
      <Typography variant="body1" component="div">
        Sorry, unable to subscribe you at this time. You may be on the list
        already.
      </Typography>
    </div>
  );
};

// SignUp Form - Massed into the mailchimp subscribe component
const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const { sessionId } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const classes = useStyles();
  const mutatation = useMutation(
    (data: { email: string; sessionId: string | null }) =>
      postSubscriber({ email, sessionId })
  );

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutatation.mutate({ email, sessionId });
    setSubmitted(true);
  };

  return (
    <div data-testid="MailChimpSignUp" className={classes.root}>
      {mutatation.isError && <ErrorDiv />}
      {mutatation.isSuccess && <SuccessDiv />}
      {mutatation.isLoading && <Loader />}
      {!submitted && (
        <div>
          <form onSubmit={submit}>
            {/* {status === 'sending' && <Loader />} */}
            <Box>
              <TextInput
                id="emailInput"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@climatemind.org"
                fullWidth={true}
                variant="filled"
                color="secondary"
                margin="none"
              />

              <Box py={2} className={classes.formButton}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => submit}
                  type="submit"
                  disabled={!isValidEmail(email)}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
