import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useFeedData } from '../hooks/useFeedData';
import { TClimateEffects } from '../types/types';
import Wrapper from 'components/Wrapper';
import PageContent from 'components/PageContent';
import { COLORS } from 'common/styles/CMTheme';
import PageTitle from 'components/PageTitle';
import { ClimateFeedCard } from 'components/ClimateFeedCard/ClimateFeedCard';

type ClimateFeedProps = {
  mockData?: TClimateEffects;
};

const ClimateFeed = ({ mockData }: ClimateFeedProps) => {
  const { climateFeedData } = useFeedData('climate');

  return (
    <Wrapper bgColor={COLORS.ACCENT5} fullHeight>
      <PageContent>
        <PageTitle>Your Personal Climate Feed</PageTitle>
        {!mockData && climateFeedData === undefined && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {mockData?.map((effect, i) => (
          <ClimateFeedCard key={i} index={i} effect={effect} />
        ))}
        {climateFeedData?.map((effect, i) => (
          <ClimateFeedCard key={i} index={i} effect={effect} />
        ))}
      </PageContent>
    </Wrapper>
  );
};

export default ClimateFeed;
