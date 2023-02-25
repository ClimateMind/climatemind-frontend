import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { useFeedData } from 'hooks/useFeedData';
import { COLORS } from 'common/styles/CMTheme';
import Wrapper from 'components/Wrapper';
import PageTitle from 'components/PageTitle';
import PageContent from 'components/PageContent';
import { ClimateFeedCard } from 'components/ClimateFeedCard/ClimateFeedCard';
import { TClimateEffects } from 'types/types';

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
