import { useNavigate } from 'react-router-dom';

import ROUTES from 'src/router/RouteConfig';
import { useAppSelector } from 'src/store/hooks';
import { CmButton, CmTypography, Page, PageContent, PageSection } from 'shared/components';
import { PersonalValueCard, useGetPersonalValues } from 'features/quiz';
import PersonalityChart from 'features/quiz/components/PersonalityChart';
import { useRetakeQuiz } from 'features/quiz/components/new/hooks';

function PersonalValuesPage() {
  const navigate = useNavigate();

  const { isLoggedIn, quizId } = useAppSelector(state => state.auth.userA);
  const { personalValues } = useGetPersonalValues(quizId);

  const { retakeQuiz } = useRetakeQuiz();

  return (
    <Page>
      <PageSection>
        <PageContent>
          <CmTypography variant='h1' style={{ marginBottom: 60 }}>This is your Climate Personality</CmTypography>

          <div style={{ width: '100%' }}>
            {personalValues?.personalValues.map((value: any, i: any) => (
              <div style={{ marginBottom: 20 }} key={i}>
                <PersonalValueCard
                  nr={i + 1}
                  name={value.name}
                  shortDescription={value.shortDescription}
                  description={value.description}
                />
              </div>
            ))}
          </div>

          <img src='/arrows/arrow-down.svg' alt='arrow-down' style={{ marginTop: 80, marginBottom: 60, transform: 'scale(2)' }} />
        </PageContent>
      </PageSection>

      <PageSection style={{ backgroundColor: 'white' }}>
        <PageContent>
          <CmTypography variant="h1">Your Personal Value Web</CmTypography>

          <PersonalityChart valueScores={personalValues?.valueScores ?? []} />
          <img src='/arrows/arrow-down.svg' alt='arrow-down' style={{ marginTop: 80, marginBottom: 60, transform: 'scale(2)' }} />
        </PageContent>
      </PageSection>

      <PageSection>
        <PageContent style={{ paddingBottom: 200 }}>
          {!isLoggedIn && (
            <>
              <CmTypography variant="h1">Get started</CmTypography>

              <CmTypography style={{ textAlign: 'center', marginBottom: 20 }} variant="body">Explore how climate change impacts you personally and relates to your values</CmTypography>
              <CmTypography style={{ textAlign: 'center', marginBottom: 20 }} variant="body">Discover climate solutions tailored to you</CmTypography>
              <CmTypography style={{ textAlign: 'center', marginBottom: 20 }} variant="body">Communicate the realities of climate change to others</CmTypography>
              <CmTypography style={{ textAlign: 'center', marginBottom: 60 }} variant="body">Set up your account and dive into effective conversations about climate change</CmTypography>

              <CmButton text='Dive in' onClick={() => navigate(ROUTES.SIGN_UP_PAGE)} style={{ marginBottom: 100 }} />
            </>
          )}

          <CmTypography variant="h4">Not happy with your results?</CmTypography>
          <CmButton variant="text" text='Retake Quiz' onClick={retakeQuiz} />
        </PageContent>
      </PageSection>
    </Page>
  );
}

export default PersonalValuesPage;
