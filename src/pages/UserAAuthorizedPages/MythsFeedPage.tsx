import { useState } from 'react';
import { CircularProgress } from '@mui/material';

import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';
import { CmTypography, Page, PageContent } from 'shared/components';
import { MythFeedCard, MythDetailsModal, useMythsFeed } from 'features/myth-feed';

function MythsFeedPage() {
  const { mythsFeed } = useMythsFeed();
  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);

  function learnMoreHandler(effectId: string) {
    analyticsService.postEvent(CardOpenEvent, effectId);
    setShowDetailsModal(effectId);
  }

  function closeCardHandler() {
    analyticsService.postEvent(CardCloseEvent, showDetailsModal!);
    setShowDetailsModal(null);
  }

  function findMyth(mythId: string) {
    const myth = mythsFeed.data?.find(value => value.iri === showDetailsModal)
    if (!myth) throw new Error(`Could not find myth with id ${mythId}`)
    return myth
  }

  return (
    <Page>
      <PageContent style={{ paddingTop: 20 }}>
        <CmTypography variant='h1'>Climate change myths</CmTypography>

        <CmTypography variant="h4" style={{ marginBottom: 50 }}>
          Arm yourself with information to challenge these common myths and
          be part of the solution to fight climate change!
        </CmTypography>

        {mythsFeed.isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
        )}

        {mythsFeed.data?.map((myth) => (
          <div style={{ marginBottom: 20 }}>
            <MythFeedCard key={myth.iri} {...myth} onLearnMore={learnMoreHandler} />
          </div>
        ))}

        {showDetailsModal && <MythDetailsModal showDetails={showDetailsModal !== null} {...findMyth(showDetailsModal)} onClose={closeCardHandler} />}
      </PageContent>
    </Page>
  );
}

export default MythsFeedPage;
