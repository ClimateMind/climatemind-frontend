import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PersonalityChart from '../../features/conversations/components/PersonalityChart';
import ROUTES from '../../router/RouteConfig';
import { useCoreValues } from '../../hooks/useCoreValues';
import { useQuestions } from '../../hooks/useQuestions';
import { useResponses } from '../../hooks/useResponses';
import Error500 from './Error500Page';
import { CmButton, CmLoader, CmTypography, Page, PageContent, PageSection } from 'shared/components';
import PersonalValueCard from 'features/quiz/components/PersonalValueCard';
import { useAppSelector } from 'store/hooks';

function PersonalValuesPage() {
  const navigate = useNavigate();
  const { personalValues, isLoading, isError } = useCoreValues();

  const { currentSet, setCurrentSet } = useQuestions();

  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { dispatch } = useResponses();

  const [retake, setRetake] = useState(false);

  // wait until we have changed the set back to SET_ONE, then do page transition to Questionaire Start
  useEffect(() => {
    if (currentSet === 1 && retake) {
      navigate(ROUTES.QUIZ_PAGE);
    }
  }, [currentSet, retake]);

  // TODO: This logic should be elsewhere  as you can now re-take the quiz from multiple places.
  const handleRetakeQuiz = () => {
    // Clear the questionnaire responses
    dispatch({ type: 'CLEAR_RESPONSES' });
    setRetake(true);

    if (setCurrentSet && currentSet === 2) {
      setCurrentSet(1);
    }
  };

  if (isLoading) {
    return <CmLoader />;
  }

  if (isError) {
    return <Error500 />;
  }

  return (
    <Page>
      <PageSection>
        <PageContent>
          <CmTypography variant='h1' style={{ marginBottom: 60 }}>This is your Climate Personality</CmTypography>

          <div style={{ width: '100%' }}>
            {personalValues?.map((value, i) => (
              <div style={{ marginBottom: 20 }}>
                <PersonalValueCard
                  key={i}
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

          <PersonalityChart />
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
          <CmButton variant="text" text='Retake Quiz' onClick={handleRetakeQuiz} />
        </PageContent>
      </PageSection>
    </Page>
  );
}

export default PersonalValuesPage;
