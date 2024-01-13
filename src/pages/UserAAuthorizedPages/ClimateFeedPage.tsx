import { useState } from 'react';
import { CircularProgress } from '@mui/material';

import { CardCloseEvent, CardOpenEvent, analyticsService } from 'src/services';
import { CmTypography, Page, PageContent } from 'shared/components';
import { ClimateDetailsModal, ClimateFeedCard, useClimateFeed } from 'features/climate-feed';

function ClimateFeedPage() {
  const { climateFeed } = useClimateFeed();
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
    const effect = climateFeed.data?.find(value => value.effectId === showDetailsModal)
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

        {climateFeed.isPending && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
        )}

        {climateFeed.data?.map((effect) => (
          <div key={effect.effectId} style={{ marginBottom: 20 }}>
            <ClimateFeedCard {...effect} onLearnMore={learnMoreHandler} />
          </div>
        ))}

        {showDetailsModal && <ClimateDetailsModal showDetails={showDetailsModal !== null} {...findEffect(showDetailsModal)} onClose={closeCardHandler} />}
      </PageContent>
    </Page>
  );
}

export default ClimateFeedPage;
