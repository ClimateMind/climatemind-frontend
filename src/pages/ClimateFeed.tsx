import React from 'react';

import { useFeedData } from 'hooks/useFeedData';
import Loader from 'components/Loader';
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
        {(!mockData && climateFeedData === undefined) ?? <Loader />}
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
