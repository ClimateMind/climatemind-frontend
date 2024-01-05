import { useState } from 'react';
import { CircularProgress } from '@mui/material';

import { useFeedData } from 'hooks/useFeedData';
import { ClimateDetailsModal, ClimateFeedCard } from 'features/climate-feed/components';
import { CmTypography, Page, PageContent } from 'shared/components';
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
    <Page>
      <PageContent style={{ paddingTop: 20 }}>
        <CmTypography variant='h1'>Explore climate change impacts</CmTypography>

        <CmTypography variant="h4" style={{ marginBottom: 50 }}>
          This is your personalized homepage based on your unique climate
          personality. Check out these articles to stay informed!
        </CmTypography>

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
    </Page>
  );
}

export default ClimateFeedPage;
