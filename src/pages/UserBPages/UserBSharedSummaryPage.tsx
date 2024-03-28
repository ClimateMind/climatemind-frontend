import { useNavigate, useParams } from 'react-router-dom';

import ROUTES_CONFIG from '../../router/RouteConfig';
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { useConversation } from 'features/conversations';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import { FooterAppBar, UserBShareSummaryCard, UserBShareSummaryImpactCard, UserBShareSummarySolutionCard } from 'features/userB/components';
import { useAlignment, useShare } from 'features/userB';

function UserBSharedSummaryPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const { conversation, isLoading: isLoadingConversation } = useConversation(conversationId ?? '');
  const { alignmentScores, alignmentSummary } = useAlignment(conversation?.alignmentScoresId);
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
      <PageContent>
        {conversation && !conversation.consent && <>
          <CmTypography variant='h1'>Sharing is caring!</CmTypography>
          <CmTypography variant='h4'>
            Share the impact and solutions you selected with {capitalizeFirstLetter(conversation.userA.name)} and
            let them know which core values you share!
          </CmTypography>
        </>}

        {conversation && conversation.consent && <>
          <CmTypography variant='h1'>Share Summary</CmTypography>
          <CmTypography variant='h4'>Here are the topics you shared with {capitalizeFirstLetter(conversation.userA.name)}.</CmTypography>
        </>}

        {isLoading && <CmLoader />}

        {alignmentSummary.data && <>
          <UserBShareSummaryCard {...alignmentSummary.data} description={alignmentScores.data?.valueAlignment[0].description ?? ''} />

          <UserBShareSummaryImpactCard effectId={alignmentSummary.data.sharedImpacts[0]} />

          <UserBShareSummarySolutionCard solutionId={alignmentSummary.data.sharedSolutions[0]} />
          <UserBShareSummarySolutionCard solutionId={alignmentSummary.data.sharedSolutions[1]} />
        </>}

        {conversation && !conversation.consent && <CmTypography variant="body" style={{ marginTop: 30, textAlign: 'center' }}>
          We only share your matching core values, selected impact and
          solutions with {capitalizeFirstLetter(conversation.userA.name)}. No other information,
          in case you were wondering. :)
        </CmTypography>}
      </PageContent>

      {conversation && <FooterAppBar bgColor={'#B9DEDF'}>
        {!conversation.consent && <CmButton text='Not Now' onClick={() => handleNotNow()} style={{ backgroundColor: 'transparent', borderColor: 'black' }} />}
        {!conversation.consent && <CmButton color='userb' text={`Share with ${capitalizeFirstLetter(conversation.userA.name)}`} onClick={() => handleShareWithUserA()} />}
        {conversation.consent && <CmButton text='Create Account' onClick={() => handleCreateAccount()} />}
      </FooterAppBar>}
    </Page>
  );
};

export default UserBSharedSummaryPage;
