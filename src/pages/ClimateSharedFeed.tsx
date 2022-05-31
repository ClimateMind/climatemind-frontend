import { Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { COLORS } from '../common/styles/CMTheme';
import Card from '../components/Card/Card';
import CardHeader from '../components/CardHeader';
import Loader from '../components/Loader';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Wrapper from '../components/Wrapper';
import { capitalize } from '../helpers/capitalize';
import { useClimateSharedFeed } from '../hooks/useClimateSharedFeed';
import Error500 from '../pages/Error500';

type ParamsProps = {
  id: string;
};

const ClimateSharedFeed: React.FC = () => {
  const { id } = useParams<ParamsProps>();
  const location = useLocation();
  const { goBack } = useHistory();
  const { data, isLoading, error } = useClimateSharedFeed(id);
  const [, name] = location.search.split('=');

  useEffect(() => {
    if (!id || !name) {
      goBack();
    }
  }, [id, name, goBack]);

  if (error) return <Error500 />;

  return (
    <>
      <ScrollToTopOnMount />
      <Wrapper bgColor={COLORS.ACCENT5}>
        <PageContent>
          {isLoading && <Loader />}

          <PageTitle>Your shared feed with {capitalize(name)}</PageTitle>
          <Typography
            variant="h6"
            style={{ textAlign: 'center', marginBottom: '24px' }}
          >
            These are climate effects that matter to you both; great starting
            points for having a constructive conversation.
          </Typography>

          {data?.climateEffects.map((item) => (
            <Card
              key={`value-${item.effectId}`}
              header={
                <CardHeader
                  title={item.effectTitle}
                  preTitle={item?.effectShortDescription ? 'Local impact' : ''}
                />
              }
              index={Number(item.effectId)}
              imageUrl={item.imageUrl}
            >
              <Typography variant="body1">
                {item.effectShortDescription}
              </Typography>
            </Card>
          ))}
          {data?.climateSolutions.map((item) => (
            <Card
              key={`value-${item.solutionId}`}
              header={
                <CardHeader
                  title={item.solutionTitle}
                  preTitle={
                    item?.solutionShortDescription ? 'Local impact' : ''
                  }
                />
              }
              index={Number(item.solutionId)}
              imageUrl={item.imageUrl}
            >
              <Typography variant="body1">
                {item.solutionShortDescription}
              </Typography>
            </Card>
          ))}
        </PageContent>
      </Wrapper>
    </>
  );
};

export default ClimateSharedFeed;
