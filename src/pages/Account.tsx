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
import { COLORS } from '../common/styles/CMTheme';
import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';
import { useAuth } from '../hooks/useAuth';

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

const AccountHome: React.FC = () => {
  const classes = useStyles();
  const authHeader = useAuthHeader();
  const authString = authHeader();
  const [message, setMessage] = useState();
  const { logout } = useAuth();

  const handleFetch = async () => {
    console.log('Fetching pretected endpoint');
    try {
      const response = await axios.get('http://localhost:8000/api/protected', {
        headers: { Authorization: authString },
      });
      const data = response.data;
      setMessage(data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    console.log('Logging out');
    logout();
  };

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT3} fullHeight={true}>
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
                <Typography variant="h4">Account Home</Typography>
              </Grid>
            </Box>

            <Box my={4}>
              <Button variant="contained" color="primary" onClick={handleFetch}>
                Get protected endpoint
              </Button>
            </Box>

            <Box my={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>

            <pre>{JSON.stringify(message, null, 2)}</pre>
          </Grid>
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
    </>
  );
};

export default AccountHome;
