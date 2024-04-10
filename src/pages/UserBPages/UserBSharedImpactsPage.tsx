import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ROUTES_CONFIG from '../../router/RouteConfig';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';
// import { useAppSelector } from 'store/hooks';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { UserBSharedImpactCard, UserBSharedImpactDetailsModal, FooterAppBar } from 'features/userB/components';
import { useSharedImpacts } from 'features/userB/hooks';
import { useAppSelector } from 'store/hooks';

function UserBSharedImpactsPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const { alignmentScoresId } = useAppSelector((state) => state.userB);
  const { impacts, chooseSharedImpact } = useSharedImpacts(alignmentScoresId);

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
    const effect = impacts?.climateEffects.find((value) => value.effectId === showDetailsModal);
    if (!effect) throw new Error(`Could not find impact with id ${effectId}`);
    return effect;
  }

  async function handleSubmitImpacts() {
    await chooseSharedImpact(alignmentScoresId, effectId);
    navigate(`${ROUTES_CONFIG.USERB_SHARED_SOLUTIONS_PAGE}/${conversationId}`);
  }

  function handleSelectImpact(newEffectId: string) {
    if (newEffectId === effectId) {
      setEffectId('');
    } else {
      setEffectId(newEffectId);
    }
  }

  const numberOfSelected = !!effectId ? '1' : '0';

  return (
    <Page>
      <PageContent style={{ textAlign: 'center' }}>
        <CmTypography variant="h1">Climate impacts you and {impacts?.userAName} share</CmTypography>

        <CmTypography variant="h4">Select one impact of climate change you’d be interested in talking to {impacts?.userAName} about.</CmTypography>

        <CmTypography variant="body" style={{ marginBottom: 30 }}>
          These topics already align with your shared core values, so it’ll be easy to start having meaningful conversations.
        </CmTypography>

        {impacts?.climateEffects.map((impact) => (
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
        <CmButton color="userb" text="Next: Solutions" disabled={!effectId} onClick={handleSubmitImpacts} />
      </FooterAppBar>

      {showDetailsModal && <UserBSharedImpactDetailsModal showDetails={showDetailsModal !== null} {...findImpact(showDetailsModal)} onClose={closeCardHandler} />}
    </Page>
  );
}

export default UserBSharedImpactsPage;
