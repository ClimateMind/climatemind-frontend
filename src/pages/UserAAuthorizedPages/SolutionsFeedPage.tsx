import React from 'react';
import { Box, CircularProgress } from '@mui/material';

import { useFeedData } from 'hooks/useFeedData';
import Wrapper from 'components/Wrapper';
import PageContent from 'components/PageContent';
import { SolutionsFeedCard } from 'components/SolutionsFeedCard/SolutionsFeedCard';
import { CmTypography } from 'shared/components';

function SolutionsFeedPage() {
  const { solutionsFeedData } = useFeedData('solutions');

  return (
    <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight>
      <PageContent>
        <CmTypography variant='h1'>Take action to fight climate change</CmTypography>
        <Box mb={3} px={5} textAlign="center">
          <CmTypography variant="h4">
            Check out how you and your community can be part of the solution!
          </CmTypography>
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
