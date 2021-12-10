import {
  Box,
  Button,
  makeStyles,
  Typography,
  Switch,
  FormGroup,
  FormControlLabel,
  Card,
} from '@material-ui/core';
import OpenInNew from '@material-ui/icons/OpenInNew';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ReactComponent as CMLogoDark } from '../../assets/cm-logo-dark.svg';
import { ReactComponent as ArrowDown } from '../../assets/icon-arrow-down-white.svg';
import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import PageTitle from '../../components/PageTitle';
import ROUTES from '../../components/Router/RouteConfig';
import { useAlignment } from '../../hooks/useAlignment';
import { useSession } from '../../hooks/useSession';
import { framingUrl } from '../../shareSettings';

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

  const [useMSW, setUseMSW] = useState(false);
  const [useQuestions, setUseQuestions] = useState(false);

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
              <Box mt={2}>
                <Typography
                  variant="h5"
                  style={{ color: COLORS.DK_TEXT, opacity: useMSW ? 1 : 0.3 }}
                >
                  Endpoints
                </Typography>
              </Box>
              <FormControlLabel
                disabled={!useMSW}
                control={
                  <Switch
                    checked={useQuestions}
                    onChange={() => setUseQuestions(!useQuestions)}
                  />
                }
                label="GET Questions"
              />
            </FormGroup>
          </Box>
        </Card>
      </div>
    </div>
  );
};
