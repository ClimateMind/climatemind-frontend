import { Typography } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../common/styles/CMTheme';
import Card from '../components/Card/Card';
import CardHeader from '../components/CardHeader';
import EffectOverlay from '../components/EffectOverlay';
import Loader from '../components/Loader';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Wrapper from '../components/Wrapper';
import { useClimateFeed } from '../hooks/useClimateFeed';
import Error500 from '../pages/Error500';

const ClimateFeed: React.FC = () => {
  const { data, isLoading, error } = useClimateFeed();

  // Redirect the user to the homepage if there is no session is
  // useNoSessionRedirect();
  if (error) return <Error500 />;

  return (
    <>
      <ScrollToTopOnMount />
      <Wrapper bgColor={COLORS.ACCENT5}>
        <PageContent>
          {isLoading && <Loader />}

          <PageTitle>Your Personal Climate Feed</PageTitle>

          {data?.climateEffects &&
            React.Children.toArray(
              data?.climateEffects.map((effect, i) => {
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
                          preTitle={
                            effect?.isPossiblyLocal ? 'Local impact' : ''
                          }
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
              })
            )}
        </PageContent>
      </Wrapper>
    </>
  );
};

export default ClimateFeed;
