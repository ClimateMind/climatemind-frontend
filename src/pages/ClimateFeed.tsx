import { Typography, Box } from '@material-ui/core';
import React from 'react';
import { COLORS } from '../common/styles/CMTheme';
import Card from '../components/Card';
import InterCardContent from '../components/InterCardContent';
import CardHeader from '../components/CardHeader';
import EffectOverlay from '../components/EffectOverlay';
import Loader from '../components/Loader';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Wrapper from '../components/Wrapper';
import { useClimateFeed } from '../hooks/useClimateFeed';
import Error500 from '../pages/Error500';
import ForumIcon from '@material-ui/icons/Forum';
import ShareIcon from '@material-ui/icons/Share';

const ClimateFeed: React.FC = () => {
  const { data, isLoading, error } = useClimateFeed();

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

                let interCardContent = undefined;

                if (i === 0) {
                  interCardContent = <InterCardContent 
                    heading="Conversations" 
                    icon={<Box ml={2}><ForumIcon /></Box>}
                    bodyText="Use the app to talk about climate change with your friends and family"
                    buttonText="GO TO TALK">
                  </InterCardContent>;
                  // go to talk
                } else if (i === 1) {
                  interCardContent = <InterCardContent 
                    heading="Share" 
                    icon={<Box ml={2}><ShareIcon /></Box>}
                    bodyText="Inspire others to talk about climate change."
                    buttonText="COPY LINK">
                  </InterCardContent>;
                  // share
                } else if (i === 2) {
                  interCardContent = <InterCardContent 
                    heading="Testing" 
                    bodyText="We are always looking for interested folks to help us make our experience better."
                    buttonText="WANT TO BE A BETA TESTER?">
                  </InterCardContent>;
                  // beta tester
                } else if (i === 3) {
                  interCardContent = <InterCardContent 
                    heading="Want to save your results?" 
                    bodyText="Save your feed to make it easy to come back to see how to talk about climate change."
                    buttonText="CREATE AN ACCOUNT">
                  </InterCardContent>;
                  // create account
                }

                const preview = effect.effectSolutions[0];
                return (
                  <div>
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

                  {interCardContent}
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
