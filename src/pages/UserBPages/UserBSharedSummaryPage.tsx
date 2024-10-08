import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import ROUTES_CONFIG from '../../router/RouteConfig';
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { useConversation } from 'features/conversations';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import { FooterAppBar, UserBShareSummaryCard, UserBShareSummaryImpactCard, UserBShareSummarySolutionCard } from 'features/userB/components';
import { useAlignment, useShare, useSelectedTopics } from 'features/userB';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';

function UserBSharedSummaryPage() {
  const isUserBLoggedIn = useSelector((state: RootState) => state.auth.userB.isLoggedIn);
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const { alignmentScoresId } = useAppSelector((state: RootState) => state.userB);
  const { conversation, isLoading: isLoadingConversation } = useConversation(conversationId ?? '');
  const { selectedTopics } = useSelectedTopics(conversationId ?? '');
  const { alignmentScores, alignmentSummary } = useAlignment(alignmentScoresId);

  const { consentSharing } = useShare();

  async function handleShareWithUserA() {
    await consentSharing(conversationId ?? '');
    navigate(`${ROUTES_CONFIG.USERB_SHARED_SUCCESS_PAGE}/${conversationId}`);
  }

  async function handleNotNow() {
    navigate(`${ROUTES_CONFIG.USERB_NO_CONSENT_PAGE}/${conversationId}`);
  }

  function handleCreateAccount() {
    navigate(`${ROUTES_CONFIG.USERB_SIGN_UP_PAGE}/${conversationId}`);
  }

  const isLoading = isLoadingConversation || alignmentSummary.isLoading;

  return (
    <Page>
      <PageContent style={{ paddingBottom: 150 }}>
        {conversation && !conversation.consent && (
          <>
            <CmTypography variant="h1">Sharing is caring!</CmTypography>
            <CmTypography variant="h4">Share the impact and solutions you selected with {capitalizeFirstLetter(conversation.userA.name)} and let them know which core values you share!</CmTypography>
          </>
        )}

        {conversation && conversation.consent && (
          <>
            <CmTypography variant="h1">Share Summary</CmTypography>
            <CmTypography variant="h4">Here are the topics you shared with {capitalizeFirstLetter(conversation.userA.name)}.</CmTypography>
          </>
        )}

        {isLoading && <CmLoader />}

        {alignmentSummary.data && <UserBShareSummaryCard {...alignmentSummary.data} description={alignmentScores.data?.valueAlignment[0].description ?? ''} />}

        {selectedTopics.data && (
          <>
            {selectedTopics.data.climateEffects && <UserBShareSummaryImpactCard effectId={selectedTopics.data.climateEffects[0].effectId} />}
            {selectedTopics.data.climateSolutions && (
              <>
                <UserBShareSummarySolutionCard solutionId={selectedTopics.data.climateSolutions[0].solutionId} />
                <UserBShareSummarySolutionCard solutionId={selectedTopics.data.climateSolutions[1].solutionId} />
              </>
            )}
          </>
        )}

        {conversation && !conversation.consent && (
          <CmTypography variant="body" style={{ marginTop: 30, textAlign: 'center' }}>
            We only share your matching core values, selected impact and solutions with {capitalizeFirstLetter(conversation.userA.name)}. No other information, in case you were wondering. :)
          </CmTypography>
        )}
      </PageContent>

      {conversation && (
        <FooterAppBar bgColor={'#B9DEDF'}>
          {!conversation.consent && <CmButton text="Not Now" onClick={() => handleNotNow()} style={{ backgroundColor: 'transparent', borderColor: 'black' }} />}
          {!conversation.consent && <CmButton color="userb" text={`Share with ${capitalizeFirstLetter(conversation.userA.name)}`} onClick={() => handleShareWithUserA()} />}
          {!isUserBLoggedIn && conversation.consent && <CmButton text="Create Account" onClick={() => handleCreateAccount()} style={{ margin: 'auto' }} />}
        </FooterAppBar>
      )}
    </Page>
  );
}

export default UserBSharedSummaryPage;
