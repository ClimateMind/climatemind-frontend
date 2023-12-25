import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

import { useFeedData } from 'hooks/useFeedData';

import Wrapper from 'components/Wrapper';
import PageContent from 'components/PageContent';
import PageTitle from 'components/PageTitle';
import { ClimateFeedCard } from 'components/ClimateFeedCard/ClimateFeedCard';
import { TClimateEffects } from 'types/types';

type ClimateFeedProps = {
  mockData?: TClimateEffects;
};

function ClimateFeedPage({ mockData }: ClimateFeedProps) {
  const { climateFeedData } = useFeedData('climate');

  return (
    <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight>
      <PageContent>
        <PageTitle>Explore climate change impacts</PageTitle>
        <Box mb={3} px={5} textAlign="center">
          <Typography variant="h5" style={{ letterSpacing: 'normal' }}>
            This is your personalized homepage based on your unique climate
            personality. Check out these articles to stay informed!
          </Typography>
        </Box>

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
}

export default ClimateFeedPage;
