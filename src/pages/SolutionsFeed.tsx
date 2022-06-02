import { Typography } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { getSolutions } from '../api/getSolutions';
import { COLORS } from '../common/styles/CMTheme';
import Card from '../components/Card/Card';
import CardHeader from '../components/CardHeader';
import Loader from '../components/Loader';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import SolutionOverlay from '../components/SolutionOverlay';
import Wrapper from '../components/Wrapper';
import { useSession } from '../hooks/useSession';
import PageWithAppBottomBar from '../templates/PageWithAppBottomBar';
import Error500 from './Error500';

const SolutionsFeed: React.FC = () => {
  const { quizId } = useSession();
  const { data, isLoading, error } = useQuery(
    ['solutions', quizId],
    () => {
      if (quizId) {
        return getSolutions(quizId);
      }
    }
  );

  if (error) return <Error500 />;

  return (
    <PageWithAppBottomBar>
      <Wrapper bgColor={COLORS.ACCENT2} fullHeight>
        <PageContent>
          <PageTitle>Ready to take action?</PageTitle>

          {isLoading && <Loader />}
          {React.Children.toArray(
            data?.solutions.map((solution, i) => (
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
    </PageWithAppBottomBar>
  );
};

export default SolutionsFeed;
