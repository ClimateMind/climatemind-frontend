import { useState } from 'react';
import { useQuery } from 'react-query';
import { Box, Grid } from '@mui/material';

import { ClimateApi } from '../../api/ClimateApi';
import Loader from '../../components/Loader';
import PageContent from '../../components/PageContent';
import Wrapper from '../../components/Wrapper';
import { useAuth } from '../../hooks/auth/useAuth';
import { useSession } from '../../hooks/useSession';
import Error500 from '../SharedPages/Error500Page';
import { CmTypography } from 'shared/components';
import { MythFeedCard } from 'features/myth-feed/components';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';
import MythDetailsModal from 'features/myth-feed/components/MythDetailsModal';

function MythFeedPage() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const { data, isLoading, error } = useQuery('myths',
    new ClimateApi(sessionId, accessToken).getMyths
  );

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
    const myth = data?.myths.find(value => value.iri === showDetailsModal)
    if (!myth) throw new Error(`Could not find myth with id ${mythId}`)
    return myth
  }

  if (error) return <Error500 />;

  return (
    <>
      <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
        <PageContent>
          <CmTypography variant='h1'>Climate change myths</CmTypography>
          <Box mb={3} px={5} textAlign="center">
            <CmTypography variant="h4">
              Arm yourself with information to challenge these common myths and
              be part of the solution to fight climate change!
            </CmTypography>
          </Box>

          {isLoading && (
            <Grid container>
              <Loader />
            </Grid>)
          }

          {!isLoading && data?.myths.map((myth) => (
            <div style={{ marginBottom: 20 }}>
              <MythFeedCard key={myth.iri} {...myth} onLearnMore={learnMoreHandler} />
            </div>
          ))}

          {showDetailsModal && <MythDetailsModal showDetails={showDetailsModal !== null} {...findMyth(showDetailsModal)} onClose={closeCardHandler} />}
        </PageContent>
      </Wrapper>
    </>
  );
}

export default MythFeedPage;
