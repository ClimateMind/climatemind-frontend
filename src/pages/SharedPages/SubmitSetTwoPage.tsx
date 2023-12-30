import { Box } from '@material-ui/core';
import React, { useEffect } from 'react';
import { ReactComponent as RewardsIcon } from '../../assets/reward-personalities.svg';
import PageContentFlex from '../../components/PageContentFlex';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import { usePostScores } from '../../hooks/usePostScores';
import { useSession } from '../../hooks/useSession';
import { QuestionnaireFinishedEvent, analyticsService } from 'services';
import { CmButton, CmTypography } from 'shared/components';

function SubmitSetTwoPage() {
  const { postScores, isLoading } = usePostScores();
  const { sessionId } = useSession();

  // Fire Analytics event when there are no more questions to be answered
  useEffect(() => {
    sessionId && analyticsService.postEvent(QuestionnaireFinishedEvent, '2');
  }, [sessionId]);

  return (
    <div style={{ minHeight: '600px' }}>
      <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight>
        <PageContentFlex>
          <PageTitle>Woohoo! Good Job!</PageTitle>

          <Box textAlign="center">
            <CmTypography variant="body">
              With the questions you just answered we can predict your Climate
              Personality.
            </CmTypography>
          </Box>

          <Box>
            <RewardsIcon />
          </Box>

          <Box textAlign="center">
            <CmTypography variant="body">
              This is a ranking of the top three personal values that you deploy
              when making decisions.
            </CmTypography>
          </Box>

          <Box>
            <CmButton
              text='Find out my Climate Personality'
              disabled={isLoading}
              onClick={postScores}
            />
          </Box>
        </PageContentFlex>
      </Wrapper>
    </div>
  );
}

export default SubmitSetTwoPage;
