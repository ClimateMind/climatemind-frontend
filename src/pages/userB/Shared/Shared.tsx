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
import getSummary from '../../../api/getSummary';
import { COLORS } from '../../../common/styles/CMTheme';
import { FooterAppBar } from '../../../components/FooterAppBar/FooterAppBar';
import Loader from '../../../components/Loader';
import PageSection from '../../../components/PageSection';
import PageTitle from '../../../components/PageTitle';
import ROUTES_CONFIG from '../../../components/Router/RouteConfig';
import Wrapper from '../../../components/Wrapper';
import { capitalize } from '../../../helpers/capitalize';
import { useAlignment } from '../../../hooks/useAlignment';
import ScrollToTopOnMount from '../../../components/ScrollToTopOnMount';
import { TLocation } from '../../../types/Location';
import { useGetOneConversation } from '../../../hooks/useGetOneConversation';

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
  const classes = useStyles();
  const { push } = useHistory();
  const location = useLocation<TLocation>();

  const { alignmentScoresId, conversationId, setConversationId } =
    useAlignment();

  if (!conversationId && location.state.id) {
    setConversationId(location.state.id);
  }
  const { conversation } = useGetOneConversation(conversationId);

  const { data, isLoading, isSuccess } = useQuery(
    ['summary', alignmentScoresId],
    () => {
      if (alignmentScoresId) {
        return getSummary(alignmentScoresId);
      }
    }
  );

  const handleCreateAccount = () => {
    push({
      pathname: ROUTES_CONFIG.USERB_ROUTE_REGISTER,
      state: { from: location.pathname, id: location.state?.id },
    });
  };

  const handleBackImpacts = () => {
    push({
      pathname: ROUTES_CONFIG.USERB_SHARED_IMPACTS,
      state: { from: location.pathname, id: location.state?.id },
    });
  };

  return (
    <main>
      <ScrollToTopOnMount />
      <Grid
        container
        className={classes.root}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        <Wrapper bgColor={COLORS.SECTION1}>
          <PageSection>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <PageTitle>Shared!</PageTitle>

                <Box textAlign="center" mb={10}>
                  <Typography variant="subtitle2">
                    {capitalize(data?.userAName!)} can now see which values,
                    impacts, and solutions you have in common and will be in
                    touch soon!
                  </Typography>
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

                  <Box textAlign="center" mt={4}>
                    <Typography className={classes.bold} variant="subtitle2">
                      Get rewards
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
                      onClick={handleBackImpacts}
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
                    onClick={handleCreateAccount}
                  >
                    Create Account
                  </Button>
                </FooterAppBar>
              </>
            )}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
};

export default ShareSummary;
