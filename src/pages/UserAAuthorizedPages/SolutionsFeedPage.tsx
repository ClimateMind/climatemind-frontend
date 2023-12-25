import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

import { useFeedData } from 'hooks/useFeedData';
import Wrapper from 'components/Wrapper';
import PageContent from 'components/PageContent';
import { SolutionsFeedCard } from 'components/SolutionsFeedCard/SolutionsFeedCard';
import PageTitle from 'components/PageTitle';

function SolutionsFeedPage() {
  const { solutionsFeedData } = useFeedData('solutions');

  return (
    <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight>
      <PageContent>
        <PageTitle>Take action to fight climate change</PageTitle>
        <Box mb={3} px={5} textAlign="center">
          <Typography variant="h5" style={{ letterSpacing: 'normal' }}>
            Check out how you and your community can be part of the solution!
          </Typography>
        </Box>

        {solutionsFeedData === undefined && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
        )}
        {solutionsFeedData?.map((solution, i) => (
          <SolutionsFeedCard key={i} index={i} solution={solution} />
        ))}
      </PageContent>
    </Wrapper>
  );
}

export default SolutionsFeedPage;
