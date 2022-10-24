import { Box, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { ReactComponent as RewardsIcon } from '../assets/reward-personalities.svg';
import { Button } from '../components/Button';
import PageContentFlex from '../components/PageContentFlex';
import PageTitle from '../components/PageTitle';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Wrapper from '../components/Wrapper';
import { usePostScores } from '../hooks/usePostScores';
import { useSession } from '../hooks/useSession';
import { pushSetFinishToDataLayer } from '../analytics';

const SubmitSetTwo: React.FC<{}> = () => {
  const { postScores, isLoading } = usePostScores();
  const { sessionId } = useSession();

  // Fire Analytics event when there are no more questions to be answered
  useEffect(() => {
    sessionId && pushSetFinishToDataLayer(1, sessionId);
  }, [sessionId]);

  return (
    <div style={{ minHeight: '600px' }}>
      <ScrollToTopOnMount />
      <Wrapper bgColor="#FF9439" fullHeight>
        <PageContentFlex>
          <PageTitle>Woohoo! Good Job!</PageTitle>

          <Box textAlign="center">
            <Typography variant="h6">
              With the questions you just answered I can predict your Climate
              Personality.
            </Typography>
          </Box>

          <Box>
            <RewardsIcon />
          </Box>

          <Box textAlign="center">
            <Typography variant="body1">
              This is a ranking of the top three personal values that you deploy
              when making decisions.
            </Typography>
          </Box>

          <Box>
            <Button
              disabled={isLoading}
              id="submitButton"
              variant="contained"
              color="primary"
              fullWidth
              disableElevation
              onClick={postScores}
              data-testid="finish-quiz-button"
            >
              Find out my Climate Personality
            </Button>
          </Box>
        </PageContentFlex>
      </Wrapper>
    </div>
  );
};

export default SubmitSetTwo;
