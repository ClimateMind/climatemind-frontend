import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';

import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';
import ROUTES_CONFIG from '../../router/RouteConfig';
import { useAlignment } from '../../hooks/useAlignment';
import { useSharedImpacts } from '../../hooks/useSharedImpacts';
import Error500 from '../SharedPages/Error500Page';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { useUserB } from '../../hooks/useUserB';
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { UserBSharedImpactCard, UserBSharedImpactDetailsModal, FooterAppBar } from 'features/userB/components';
import { useApiClient } from 'shared/hooks';

function UserBSharedImpactsPage() {
  const apiClient = useApiClient();

  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { impacts, userAName, isError, isLoading } = useSharedImpacts();
  const { alignmentScoresId } = useAlignment();
  const { logError } = useErrorLogging();

  const [showDetailsModal, setShowDetailsModal] = useState<string | null>(null);
  const [effectId, setEffectId] = useState('');

  function learnMoreHandler(effectId: string) {
    analyticsService.postEvent(CardOpenEvent, effectId);
    setShowDetailsModal(effectId);
  }

  function closeCardHandler() {
    analyticsService.postEvent(CardCloseEvent, showDetailsModal!);
    setShowDetailsModal(null);
  }

  function findImpact(effectId: string) {
    const effect = impacts?.find(value => value.effectId === showDetailsModal)
    if (!effect) throw new Error(`Could not find impact with id ${effectId}`)
    return effect
  }

  const mutateChooseSharedImpacts = useMutation(
    (_: { effectId: string; alignmentScoresId: string }) =>
      apiClient.postSharedImpacts(alignmentScoresId, [{ effectId }]),
    {
      onSuccess: () => {
        if (process.env.NODE_ENV === 'development') {
          console.log('SUCCESS');
        }
        navigate(`${ROUTES_CONFIG.USERB_SHARED_SOLUTIONS_PAGE}/${conversationId}`, {
          state: { from: location.pathname, id: conversationId },
        });
      },
      onError: (error: any) => {
        logError(error);
      },
    }
  );

  const handleNextSolutions = () => {
    mutateChooseSharedImpacts.mutate({ effectId, alignmentScoresId }); // should be triggered when "next" clicked?
    //if success ->
    // push('/shared-solutions');
  };

  function handleSelectImpact(newEffectId: string) {
    if (newEffectId === effectId) {
      setEffectId('');
    } else {
      setEffectId(newEffectId);
    }
  }

  const numberOfSelected = !!effectId ? '1' : '0';

  if (isError) return <Error500 />;

  return (
    <Page>
      <PageContent style={{ textAlign: 'center' }}>
        <CmTypography variant='h1'>Climate impacts you and {userAName} share</CmTypography>

        <CmTypography variant="h4">
          Select one impact of climate change you’d be interested in
          talking to {userAName} about.
        </CmTypography>

        <CmTypography variant="body" style={{ marginBottom: 30 }}>
          These topics already align with your shared core values, so
          it’ll be easy to start having meaningful conversations.
        </CmTypography>

        {isLoading && <CmLoader />}

        {impacts?.map((impact) => (
          <UserBSharedImpactCard
            key={impact.effectId}
            {...impact}
            onLearnMore={(effectId) => learnMoreHandler(effectId)}
            isSelected={effectId === impact.effectId}
            onSelected={(effectId) => handleSelectImpact(effectId)}
            disabled={effectId !== '' && effectId !== impact.effectId}
            style={{ marginBottom: 20 }}
          />
        ))}
      </PageContent>

      <FooterAppBar bgColor={'#B9DEDF'}>
        <CmTypography variant="button">Selected {numberOfSelected} of 1</CmTypography>
        <CmButton color='userb' text='Next: Solutions' disabled={!effectId} onClick={handleNextSolutions} />
      </FooterAppBar>

      {showDetailsModal && <UserBSharedImpactDetailsModal showDetails={showDetailsModal !== null} {...findImpact(showDetailsModal)} onClose={closeCardHandler}/>}
    </Page>
  );
}

export default UserBSharedImpactsPage;
