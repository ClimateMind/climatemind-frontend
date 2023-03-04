import {
  Box,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { COLORS } from '../../../common/styles/CMTheme';
import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
import Loader from '../../../components/Loader';
import PageSection from '../../../components/PageSection';
import PageTitle from '../../../components/PageTitle';
import ROUTES_CONFIG from '../../../components/Router/RouteConfig';
import Wrapper from '../../../components/Wrapper';
import { capitalize } from '../../../helpers/capitalize';
import { useAlignment } from '../../../hooks/useAlignment';
import { useUserB } from '../../../hooks/useUserB';
import { useGetOneConversation } from '../../../hooks/useGetOneConversation';
import { ClimateApi } from '../../../api/ClimateApi';
import { useSession } from '../../../hooks/useSession';
import { useAuth } from '../../../hooks/auth/useAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
    },
    bold: {
      fontWeight: 800,
    },
    largeIcon: {
      transform: 'scale(8)',
      fill: '#ffffff',
    },
    span: {
      margin: '0px 3px 3px 0px',
    },
    leftButton: {
      marginLeft: '8px',
    },
    centerButton: {
      margin: '0 auto',
      display: 'block',
    },
  })
);

const ShareSummary: React.FC = () => {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const classes = useStyles();
  const { push } = useHistory();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { conversation } = useGetOneConversation(conversationId);
  const { alignmentScoresId, setAlignmentScoresId } = useAlignment();

  const { data, isSuccess } = useQuery(
    ['summary', alignmentScoresId],
    async () => {
      if (alignmentScoresId && alignmentScoresId !== '') {
        return await new ClimateApi(sessionId, accessToken).getSummary(
          alignmentScoresId
        );
      }

      if (alignmentScoresId === '' && conversationId) {
        const result = await new ClimateApi(
          sessionId,
          accessToken
        ).getOneConversation(conversationId);
        setAlignmentScoresId(result.alignmentScoresId!);
        return await new ClimateApi(sessionId, accessToken).getSummary(
          result.alignmentScoresId!
        );
      }
    }
  );

  const handleCreateAccount = () => {
    push({
      pathname: `${ROUTES_CONFIG.USERB_ROUTE_REGISTER}/${conversationId}`,
      state: { from: location.pathname, id: conversationId },
    });
  };

  const handleBackImpacts = () => {
    push({
      pathname: `${ROUTES_CONFIG.USERB_SHARED_IMPACTS}/${conversationId}`,
      state: { from: location.pathname, id: conversationId },
    });
  };

  const handleSharedTopics = () => {
    push({
      pathname: `${ROUTES_CONFIG.USERB_SHARED_SUMMARY}/${conversationId}`,
      state: { from: location.pathname, id: conversationId },
    });
  };

  if (data === undefined) {
    return <Loader></Loader>;
  }

  return (
    <main>
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        <Wrapper bgColor={COLORS.SECTION1}>
          <PageSection>
            <PageTitle>Shared!</PageTitle>

            <Box textAlign="center" mb={10}>
              <Typography variant="subtitle2">
                {capitalize(data?.userAName!)} can now see which values,
                impacts, and solutions you have in common and will be in touch
                soon!
              </Typography>
              <Button
                style={{ border: '1px solid #07373B', marginTop: '5px' }}
                onClick={() => handleSharedTopics()}
              >
                Shared Topics
              </Button>
            </Box>

            <Box textAlign="center">
              <CloudDoneIcon className={classes.largeIcon} />
            </Box>

            <Grid
              container
              direction="column"
              alignItems="center"
              className={classes.root}
              spacing={1}
            >
              <Box textAlign="center" mt={14}>
                <Typography variant="subtitle2">
                  Until then, why not create your own account?
                </Typography>
              </Box>

              <Box textAlign="center" mt={2}>
                <Typography className={classes.bold} variant="subtitle2">
                  Unlock the rest of your core values
                </Typography>
              </Box>

              <Box textAlign="center" mt={3}>
                <Typography className={classes.bold} variant="subtitle2">
                  Explore your own personalized climate topics and solutions
                </Typography>
              </Box>

              <Box textAlign="center" mt={3}>
                <Typography className={classes.bold} variant="subtitle2">
                  Match with even more friends
                </Typography>
              </Box>
            </Grid>

            <FooterAppBar bgColor={COLORS.ACCENT10}>
              {!conversation?.consent && (
                <Button
                  style={{
                    border: '1px solid #07373B',
                    marginRight: '8px',
                  }}
                  onClick={() => handleBackImpacts()}
                >
                  <span className={classes.span}>{'< '}</span>
                  Impacts
                </Button>
              )}

              <Button
                variant="contained"
                data-testid="take-quiz-userb-button"
                color="primary"
                disableElevation
                disabled={!isSuccess}
                className={
                  conversation?.consent
                    ? classes.centerButton
                    : classes.leftButton
                }
                style={{ border: '1px solid #a347ff' }}
                onClick={() => handleCreateAccount()}
              >
                Create Account
              </Button>
            </FooterAppBar>
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default ShareSummary;
