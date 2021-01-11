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
  message: any;
  onValidated: (data: any) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
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
      {status === 'error' && (
        <Typography
          variant="body1"
          className={classes.error}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'success' && (
        <Typography
          variant="body1"
          className={classes.success}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
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
