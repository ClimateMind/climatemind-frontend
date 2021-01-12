import React, { useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { Box, makeStyles, createStyles } from '@material-ui/core';
import Loader from './Loader';
import { Typography } from '@material-ui/core';
import { COLORS } from '../common/styles/CMTheme';
import { isValidEmail } from '../helpers/emailAddress';

interface FormProps {
  status: 'error' | 'success' | 'sending' | null;
  message: string | Error | null;
  onValidated: (data: any) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
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

const ErrorDiv = (message: any) => {
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
const CustomForm: React.FC<FormProps> = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const classes = useStyles();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    email &&
      onValidated({
        EMAIL: email,
      });
    setEmail('');
    setSubmitted(true);
  };

  return (
    <div>
      {status === 'error' && <ErrorDiv message={message} />}
      {status === 'success' && <SuccessDiv />}
      {!submitted && (
        <form onSubmit={submit}>
          {status === 'sending' && <Loader />}
          <Box py={4}>
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
      )}
    </div>
  );
};

const MailChimpSignUp = () => {
  const url =
    'https://climatemind.us18.list-manage.com/subscribe/post?u=a8795c1814f6dfd3ce4561a17&amp;id=b451cfd1ed';

  return (
    <div>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={subscribe}
          />
        )}
      />
    </div>
  );
};

export default MailChimpSignUp;
