import { useState } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress } from '@mui/material';

import Error500 from '../SharedPages/Error500Page';
import { CmTypography, Page, PageContent } from 'shared/components';
import { MythFeedCard } from 'features/myth-feed/components';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';
import MythDetailsModal from 'features/myth-feed/components/MythDetailsModal';
import { useApiClient } from 'shared/hooks';

function MythFeedPage() {
  const apiClient = useApiClient();

  const { data, isLoading, error } = useQuery('myths', apiClient.getMythsFeed);

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
    const myth = data?.find(value => value.iri === showDetailsModal)
    if (!myth) throw new Error(`Could not find myth with id ${mythId}`)
    return myth
  }

  if (error) return <Error500 />;

  return (
    <Page>
      <PageContent style={{ paddingTop: 20 }}>
        <CmTypography variant='h1'>Climate change myths</CmTypography>

        <CmTypography variant="h4" style={{ marginBottom: 50 }}>
          Arm yourself with information to challenge these common myths and
          be part of the solution to fight climate change!
        </CmTypography>

        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
        )}

        {!isLoading && data?.map((myth) => (
          <div style={{ marginBottom: 20 }}>
            <MythFeedCard key={myth.iri} {...myth} onLearnMore={learnMoreHandler} />
          </div>
        ))}

        {showDetailsModal && <MythDetailsModal showDetails={showDetailsModal !== null} {...findMyth(showDetailsModal)} onClose={closeCardHandler} />}
      </PageContent>
    </Page>
  );
}

export default MythFeedPage;
