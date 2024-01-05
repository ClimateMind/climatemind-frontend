import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { usePostScores } from '../../hooks/usePostScores';
import { useQuestions } from '../../hooks/useQuestions';
import { useSession } from '../../hooks/useSession';
import { QuestionnaireFinishedEvent, analyticsService } from 'services';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';

function SubmitSetOnePage() {
  const navigate = useNavigate();
  const { currentSet, setCurrentSet } = useQuestions();
  const { postScores, isLoading } = usePostScores();
  const { sessionId } = useSession();

  // Fire Analytics event when there are no more questions to be answered
  useEffect(() => {
    sessionId && analyticsService.postEvent(QuestionnaireFinishedEvent, '1');
  }, [sessionId]);

  useEffect(() => {
    if (currentSet === 2) {
      navigate('/questionnaire');
    }
  }, [currentSet]);

  const handleFinishSetTwo = () => {
    // switch to set 2 of questions
    if (setCurrentSet) {
      setCurrentSet(2);
    }
  };
  return (
    <Page style={{ height: '100%' }}>
      <PageContent style={{ textAlign: 'center' }}>
        <CmTypography variant="h1">Woah! You are doing great!</CmTypography>

        <CmTypography variant="body" style={{ marginTop: 20, marginBottom: 40 }}>
          Do you want to carry on with another 10 questions or get your
          results now?
        </CmTypography>

        <CmButton
          variant='text'
          text='Find out my Climate Personality'
          disabled={isLoading}
          onClick={postScores}
        />

        <CmTypography variant="body" style={{ marginTop: 40, marginBottom: 40 }}>
          You will get better personalised results if you complete all 20
          questions.
        </CmTypography>

        <CmButton
          text='Continue'
          disabled={isLoading}
          onClick={handleFinishSetTwo}
        />
      </PageContent>
    </Page>
  );
}

export default SubmitSetOnePage;
