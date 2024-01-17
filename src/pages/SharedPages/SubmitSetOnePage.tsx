import { useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { useFinishQuiz } from 'features/quiz/hooks';

function SubmitSetOnePage() {
  const navigate = useNavigate();
  const { submitAnswers } = useFinishQuiz();

  function handleSubmit() {
    submitAnswers(1);
    navigate(ROUTES.PERSONAL_VALUES_PAGE);
  }

  return (
    <Page>
      <PageContent style={{ textAlign: 'center' }}>
        <CmTypography variant="h1">Woah! You are doing great!</CmTypography>

        <CmTypography variant="body" style={{ marginTop: 20, marginBottom: 40 }}>
          Do you want to carry on with another 10 questions or get your results now?
        </CmTypography>

        <CmButton variant='text' text='Find out my Climate Personality' onClick={handleSubmit} />

        <CmTypography variant="body" style={{ marginTop: 40, marginBottom: 40 }}>
          You will get better personalised results if you complete all 20 questions.
        </CmTypography>

        <CmButton text='Continue' onClick={() => navigate(ROUTES.QUIZ_PAGE, { state: { questionSetNumber: 2 }})} />
      </PageContent>
    </Page>
  );
}

export default SubmitSetOnePage;
