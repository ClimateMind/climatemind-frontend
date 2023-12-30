import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@material-ui/core';

import PageContentFlex from '../../components/PageContentFlex';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import { usePostScores } from '../../hooks/usePostScores';
import { useQuestions } from '../../hooks/useQuestions';
import { useSession } from '../../hooks/useSession';
import { QuestionnaireFinishedEvent, analyticsService } from 'services';
import { CmButton, CmTypography } from 'shared/components';

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
    <Wrapper bgColor={'rgba(138, 213, 204, 0.6)'} fullHeight>
      <PageContentFlex>
        <Box textAlign="center">
          <PageTitle variant="h1">Woah! You are doing great!</PageTitle>
        </Box>

        <Box textAlign="center">
          <CmTypography variant="body">
            Do you want to carry on with another 10 questions or get your
            results now?
          </CmTypography>
        </Box>

        <Box mt={1}>
            <CmButton
              variant='text'
              text='Find out my Climate Personality'
              disabled={isLoading}
              onClick={postScores}
            />
        </Box>

        <Box component="div">
          <CmTypography variant="body">
            You will get better personalised results if you complete all 20
            questions.
          </CmTypography>
        </Box>

        <Box component="div">
          <CmButton
            text='Continue'
            disabled={isLoading}
            onClick={handleFinishSetTwo}
          />
        </Box>
      </PageContentFlex>
    </Wrapper>
  );
}

export default SubmitSetOnePage;
