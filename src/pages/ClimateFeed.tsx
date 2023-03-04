import React, { useEffect, useState } from 'react';
import { useFeedback } from '../hooks/useFeedback';
import { TClimateEffects } from '../types/types';
import { CircularProgress } from '@material-ui/core';

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
