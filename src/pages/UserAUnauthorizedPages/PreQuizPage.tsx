import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

import ROUTES from 'router/RouteConfig';
import { CmButton, CmTypography, Page, PageContent, PageSection } from 'shared/components';

function PreQuizPage() {
  const navigate = useNavigate();

  return (
    <Page>
      <PageSection>
        <PageContent style={{ textAlign: 'center' }}>
          <CmTypography variant='h2'>First, what do you care about?</CmTypography>

          <CmTypography variant="body">
            Take this short quiz about personal values so we can help you find
            common ground and topics for your conversations.
          </CmTypography>

          <CmTypography variant="body" style={styles.explainerParagraph}>
            Read each statement and decide how much like it you are or not.
            Don't worry! There's no right or wrong answers!
          </CmTypography>

          <CmButton text='Take the quiz' onClick={() => navigate(ROUTES.QUIZ_PAGE, { state: { questionSetNumber: 1 }})} />
        </PageContent>
      </PageSection>

      <PageSection style={{ backgroundColor: '#07373b', flex: 1 }}>
        <PageContent>
          <CmTypography variant="h3" style={{ color: 'white' }}>
            Personal values are key for effective climate conversations.
          </CmTypography>

          <img src='/pre-quiz-page-cm-logo.svg' alt='cm logo' style={{ maxWidth: '110px', marginTop: 20, marginBottom: 50 }} />
          <img src='/arrows/arrow-up.svg' alt='arrow-up' />
        </PageContent>
      </PageSection>
    </Page>
  );
}

const styles: { [key: string]: CSSProperties } = {
  explainerParagraph: {
    fontFamily: 'atten-round-new',
    fontWeight: 900,
    marginTop: 40,
    marginBottom: 40,
  },
};

export default PreQuizPage;
