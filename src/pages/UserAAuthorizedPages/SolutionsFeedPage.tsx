import { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

import { useFeedData } from 'hooks/useFeedData';
import Wrapper from 'components/Wrapper';
import PageContent from 'components/PageContent';
import { SolutionFeedCard } from 'features/solution-feed/components';
import { CmTypography } from 'shared/components';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';
import SolutionDetailsModal from 'features/solution-feed/components/SolutionDetailsModal';

function SolutionsFeedPage() {
  const { solutionsFeedData } = useFeedData('solutions');
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);

  function learnMoreHandler(solutionId: string) {
    analyticsService.postEvent(CardOpenEvent, solutionId);
    setShowDetailsModal(solutionId);
  }

  function closeCardHandler() {
    analyticsService.postEvent(CardCloseEvent, showDetailsModal!);
    setShowDetailsModal(null);
  }

  function findSolution(solutionId: string) {
    const solution = solutionsFeedData?.find(value => value.iri === showDetailsModal)
    if (!solution) throw new Error(`Could not find solution with id ${solutionId}`)
    return solution
  }

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
          <div style={{ marginBottom: 20 }}>
            <SolutionFeedCard key={i} {...solution} onLearnMore={learnMoreHandler} />
          </div>
        ))}

        {showDetailsModal && <SolutionDetailsModal showDetails={showDetailsModal !== null} {...findSolution(showDetailsModal)} onClose={closeCardHandler} />}
      </PageContent>
    </Wrapper>
  );
}

export default SolutionsFeedPage;
