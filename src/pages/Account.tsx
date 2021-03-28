import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import Button from '../components/Button';
import Wrapper from '../components/Wrapper';
import PageContent from '../components/PageContent';

import { COLORS } from '../common/styles/CMTheme';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiFormControl-root': {
        margin: '0.4em 0',
      },
      '& pre': {
        maxWidth: '100%',
      },
    },
  })
);

// axios.defaults.withCredentials = true;

const AccountHome: React.FC = () => {
  const classes = useStyles();
  const authHeader = useAuthHeader();
  const authString = authHeader();
  const [message, setMessage] = useState();
  const { logout } = useAuth();
  const { showToast } = useToast();

  const handleFetch = async () => {
    console.log('Fetching pretected endpoint');
    try {
      const response = await axios.get('http://localhost:5000/protected', {
        headers: { Authorization: authString },
      });
      const data = response.data;
      setMessage(data);
      console.log(response);
    } catch (err) {
      showToast({
        message: err.message,
        type: 'error',
      });
      console.error(err);
    }
  };

  const handleTest = async () => {
    try {
      const req = await axios.get('http://localhost:5000/test', {
        withCredentials: true,
      });
      const res = req.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleRefresh = async () => {
    console.log('Refreshing');
    try {
      const response = await axios('http://localhost:5000/refresh', {
        method: 'post',
        withCredentials: true,
      });
      // const response = await axios.post('http://localhost:5000/refresh');
      const data = response.data;
      setMessage(data);
      console.log(response);
    } catch (err) {
      showToast({
        message: err.message,
        type: 'error',
      });
      console.error(err);
    }
  };

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT3} fullHeight={true}>
        <PageContent>
          <Grid
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
                  <Typography variant="h4">Account Home</Typography>
                </Grid>
              </Box>

              <Box my={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFetch}
                >
                  Get protected endpoint
                </Button>
              </Box>

              <Box my={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </Box>

              <Box my={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleRefresh()}
                >
                  refresh
                </Button>
              </Box>

              <Box my={4}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleTest()}
                >
                  Test
                </Button>
              </Box>

              <div style={{ maxWidth: '300px', wordBreak: 'break-all' }}>
                {JSON.stringify(message, null, 2)}
              </div>
            </Grid>
          </Grid>
        </PageContent>
      </Wrapper>
    </>
  );
};

export default AccountHome;
