import {
  Box,
  Card,
  FormControlLabel,
  FormGroup,
  makeStyles,
  Switch,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as CMLogoDark } from '../../assets/cm-logo-dark.svg';
import { COLORS } from '../../common/styles/CMTheme';
import PageTitle from '../../components/PageTitle';
import { useMockServiceWorker } from '../../mocks/useMSW';

const styles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: COLORS.ACCENT9,
    },
    typography: {
      textAlign: 'center',
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
    },
  };
});

export const DevMenu: React.FC = () => {
  const classes = styles();

  const {
    useMSW,
    setUseMSW,
    useQuestions,
    setUseQuestions,
    useGetOneConversation,
    setUseGetOneConversation,
    usePostAlignment,
    setUsePostAlignment,
    useGetAlignment,
    setUseGetAlignment,
  } = useMockServiceWorker();

  const { push } = useHistory();

  if (process.env.NODE_ENV !== 'development') {
    push('/');
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Box py={3}>
          <CMLogoDark data-testid="climate-mind-logo" />
        </Box>
        <Box textAlign="center">
          <PageTitle variant="h1">Climate Mind - Developer Menu</PageTitle>
        </Box>
        <Card style={{ padding: '1em 1.5em' }}>
          <Box textAlign="left">
            <Typography variant="h3">Mock Service Worker</Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={useMSW}
                    onChange={() => setUseMSW(!useMSW)}
                  />
                }
                label="Use Mock Service Worker"
              />
              <Box my={1}>
                <Typography variant="h4" style={{ opacity: useMSW ? 1 : 0.3 }}>
                  Endpoints
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={useQuestions}
                        disabled={!useMSW}
                        onChange={() => setUseQuestions(!useQuestions)}
                      />
                    }
                    label="GET Questions"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={useGetOneConversation}
                        disabled={!useMSW}
                        onChange={() =>
                          setUseGetOneConversation(!useGetOneConversation)
                        }
                      />
                    }
                    label="GET One Conversation"
                  />
                </FormGroup>

                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={usePostAlignment}
                        disabled={!useMSW}
                        onChange={() => setUsePostAlignment(!usePostAlignment)}
                      />
                    }
                    label="POST Aligment"
                  />
                </FormGroup>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={useGetAlignment}
                        disabled={!useMSW}
                        onChange={() => setUseGetAlignment(!useGetAlignment)}
                      />
                    }
                    label="GET Aligment"
                  />
                </FormGroup>
              </Box>
            </FormGroup>
          </Box>
        </Card>
      </div>
    </div>
  );
};
