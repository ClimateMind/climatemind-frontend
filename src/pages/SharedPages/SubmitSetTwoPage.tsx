import { useEffect } from 'react';

import { usePostScores } from '../../hooks/usePostScores';
import { QuestionnaireFinishedEvent, analyticsService } from 'services';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { useAppSelector } from 'store/hooks';

function SubmitSetTwoPage() {
  const { postScores, isLoading } = usePostScores();
  const { sessionId } = useAppSelector(state => state.auth);

  // Fire Analytics event when there are no more questions to be answered
  useEffect(() => {
    sessionId && analyticsService.postEvent(QuestionnaireFinishedEvent, '2');
  }, [sessionId]);

  return (
    <Page>
      <PageContent>
        <CmTypography variant="h1">Woohoo! Good Job!</CmTypography>
        <CmTypography variant="body" style={{ textAlign: 'center' }}>
          With the questions you just answered we can predict your Climate
          Personality.
        </CmTypography>

        <img src='/submit-set-two-reward.svg' alt='rewards' style={{ maxWidth: '640px', marginTop: 40, marginBottom: 40 }} />

        <CmTypography variant="body" style={{ textAlign: 'center', marginBottom: 40 }}>
          This is a ranking of the top three personal values that you deploy
          when making decisions.
        </CmTypography>

        <CmButton
          text="Find out my Climate Personality"
          disabled={isLoading}
          onClick={postScores}
        />
      </PageContent>
    </Page>
  );
}

export default SubmitSetTwoPage;
