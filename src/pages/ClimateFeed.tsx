import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import getFeed from '../api/getFeed';
import getQuizId from '../api/getQuizId';
import { COLORS } from '../common/styles/CMTheme';
import Card from '../components/Card/Card';
import CardHeader from '../components/CardHeader';
import EffectOverlay from '../components/EffectOverlay';
import Loader from '../components/Loader';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/auth/useAuth';
import { useSession } from '../hooks/useSession';
import { useToast } from '../hooks/useToast';
import { TClimateEffects } from '../types/types';

const ClimateFeed: React.FC = () => {
  const { sessionId } = useSession();
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();

  const fetchClimateFeedData = async () => {
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
        throw new Error("QuizId couldn't be found!");
      }
      // If a user is logged in, we can fetch the quizId from the backend.
    } else {
      quizId = (await getQuizId()).quizId;
    }

    const response = await getFeed(quizId);
    return response.climateEffects;
  };

  const [climateFeedData, setClimateFeedData] = useState<
    TClimateEffects | undefined
  >(undefined);

  useEffect(() => {
    if (sessionId && sessionId !== '') {
      fetchClimateFeedData().then((res) => setClimateFeedData(res));
    }

    // eslint-disable-next-line
  }, [isLoggedIn, sessionId]);

  if (climateFeedData === undefined) {
    return <Loader />;
  }

  return (
    <>
      <ScrollToTopOnMount />
      <Wrapper bgColor={COLORS.ACCENT5}>
        <PageContent>
          <PageTitle>Your Personal Climate Feed</PageTitle>

          {climateFeedData.map((effect, i) => {
            // TODO: Refactor below into a component
            const preview = effect.effectSolutions[0];
            return (
              <div
                data-testid={`EffectCard-${effect.effectId}`}
                key={`value-${i}`}
              >
                <Card
                  header={
                    <CardHeader
                      title={effect.effectTitle}
                      preTitle={effect?.isPossiblyLocal ? 'Local impact' : ''}
                      isPossiblyLocal={effect.isPossiblyLocal}
                    />
                  }
                  index={i}
                  imageUrl={effect.imageUrl}
                  footer={<EffectOverlay effect={effect} />}
                  preview={
                    <CardHeader
                      title={preview.solutionTitle}
                      preTitle={`${preview.solutionType} Action`}
                      bgColor={COLORS.ACCENT2}
                      index={i}
                      cardIcon={preview.solutionType}
                    />
                  }
                >
                  <Typography variant="body1">
                    {effect.effectShortDescription}
                  </Typography>
                </Card>
              </div>
            );
          })}
        </PageContent>
      </Wrapper>
    </>
  );
};

export default ClimateFeed;
