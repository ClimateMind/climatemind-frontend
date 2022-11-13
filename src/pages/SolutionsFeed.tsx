import React, { useEffect, useState } from 'react';
import { getSolutions } from '../api/getSolutions';
import { COLORS } from '../common/styles/CMTheme';
import { Typography } from '@material-ui/core';
import Loader from '../components/Loader';
import Card from '../components/Card/Card';
import CardHeader from '../components/CardHeader';
import Wrapper from '../components/Wrapper';
import SolutionOverlay from '../components/SolutionOverlay';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import PageTitle from '../components/PageTitle';
import PageContent from '../components/PageContent';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/auth/useAuth';
import { useErrorLogging } from '../hooks/useErrorLogging';
import getQuizId from '../api/getQuizId';
import { TSolutions } from '../types/Solutions';
import { useSession } from '../hooks/useSession';

const SolutionsFeed: React.FC = () => {
  const { sessionId } = useSession();
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  const { logError } = useErrorLogging();

  const [isLoading, setIsLoading] = useState(true);

  const fetchSolutionsFeedData = async () => {
    let quizId: string | undefined = undefined;

    // If a user isn't logged in, we take the quizId from the localStorage, as
    // he just finished the quiz before seeing the feed.
    if (!isLoggedIn) {
      if (localStorage.getItem('quizId')) {
        quizId = localStorage.getItem('quizId')!.replaceAll('"', '');
      } else {
        showToast({
          message:
            'Either log in or complete a quiz to view your climate feed.',
          type: 'error',
        });
        logError("QuizId couldn't be found"!);
      }
      // If a user is logged in, we can fetch the quizId from the backend.
    } else {
      quizId = (await getQuizId()).quizId;
    }

    if (quizId) {
      const response = await getSolutions(quizId);
      setIsLoading(false);
      return response.solutions;
    }
    throw new Error();
  };

  const [solutionsFeedData, setSolutionsFeedData] = useState<TSolutions>([]);

  useEffect(() => {
    if (sessionId && sessionId !== '') {
      fetchSolutionsFeedData().then((res) => {
        setSolutionsFeedData(res!);
      });
    }

    // eslint-disable-next-line
  }, [isLoggedIn, sessionId]);

  return (
    <>
      {isLoading ? <Loader /> : <></>}
      <Wrapper bgColor={COLORS.ACCENT2} fullHeight>
        <PageContent>
          <ScrollToTopOnMount />

          <PageTitle>Ready to take action?</PageTitle>

          {React.Children.toArray(
            solutionsFeedData!.map((solution, i) => (
              <div data-testid={`ActionCard-${solution.iri}`}>
                <Card
                  header={
                    <CardHeader
                      title={solution.solutionTitle}
                      preTitle={`${solution.solutionType} action`}
                    />
                  }
                  key={`value-${i}`}
                  index={i}
                  imageUrl={solution.imageUrl}
                  footer={<SolutionOverlay solution={solution} />}
                >
                  <Typography variant="body1">
                    {solution.shortDescription}
                  </Typography>
                </Card>
              </div>
            ))
          )}
        </PageContent>
      </Wrapper>
    </>
  );
};

export default SolutionsFeed;
