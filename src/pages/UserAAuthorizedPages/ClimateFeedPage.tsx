import { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';


import { useFeedData } from 'hooks/useFeedData';
import Wrapper from 'components/Wrapper';
import PageContent from 'components/PageContent';
import { ClimateDetailsModal, ClimateFeedCard } from 'features/climate-feed/components';
import { CmTypography } from 'shared/components';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';

function ClimateFeedPage() {
  const { climateFeedData } = useFeedData('climate');
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);

  function learnMoreHandler(effectId: string) {
    analyticsService.postEvent(CardOpenEvent, effectId);
    setShowDetailsModal(effectId);
  }

  function closeCardHandler() {
    analyticsService.postEvent(CardCloseEvent, showDetailsModal!);
    setShowDetailsModal(null);
  }

  function findEffect(effectId: string) {
    const effect = climateFeedData?.find(value => value.effectId === showDetailsModal)
    if (!effect) throw new Error(`Could not find effect with id ${effectId}`)
    return effect
  }

  return (
    <Wrapper bgColor="rgba(138, 213, 204, 0.6)" fullHeight>
      <PageContent>
        <CmTypography variant='h1'>Explore climate change impacts</CmTypography>
        <Box mb={3} px={5} textAlign="center">
          <CmTypography variant="h4">
            This is your personalized homepage based on your unique climate
            personality. Check out these articles to stay informed!
          </CmTypography>
        </Box>

        {climateFeedData === undefined && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
        )}

        {climateFeedData?.map((effect) => (
          <div style={{ marginBottom: 20 }}>
            <ClimateFeedCard key={effect.effectId} {...effect} onLearnMore={learnMoreHandler} />
          </div>
        ))}

        {showDetailsModal && <ClimateDetailsModal showDetails={showDetailsModal !== null} {...findEffect(showDetailsModal)} onClose={closeCardHandler} />}
      </PageContent>
    </Wrapper>
  );
}

export default ClimateFeedPage;
