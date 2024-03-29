import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import ROUTES_CONFIG from '../../router/RouteConfig';
import { capitalize } from '../../helpers/capitalize';
import { useAlignment } from '../../hooks/useAlignment';
import { useUserB } from '../../hooks/useUserB';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { FooterAppBar } from 'features/userB/components';
import { useApiClient } from 'shared/hooks';

function UserBSharedSuccessPage() {
  const apiClient = useApiClient();

  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { conversation } = useGetOneConversation(conversationId ?? '');
  const { alignmentScoresId, setAlignmentScoresId } = useAlignment();

  const { data, isSuccess } = useQuery(
    ['summary', alignmentScoresId],
    async () => {
      if (alignmentScoresId && alignmentScoresId !== '') {
        return await apiClient.getAlignmentSummary(alignmentScoresId);
      }

      if (alignmentScoresId === '' && conversationId) {
        const result = await apiClient.getConversation(conversationId);
        setAlignmentScoresId(result.alignmentScoresId!);
        return await apiClient.getAlignmentSummary(result.alignmentScoresId);
      }
    }
  );

  const handleCreateAccount = () => {
    navigate(`${ROUTES_CONFIG.USERB_SIGN_UP_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  const handleBackImpacts = () => {
    navigate(`${ROUTES_CONFIG.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  const handleSharedTopics = () => {
    navigate(`${ROUTES_CONFIG.USERB_SHARED_SUMMARY_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  if (data === undefined) {
    return <CmLoader />;
  }

  return (
    <Page style={{ paddingBottom: 100 }}>
      <PageContent>
        <CmTypography variant='h1'>Shared!</CmTypography>

        <CmTypography variant="h4">
          {capitalize(data?.userAName!)} can now see which values,
          impacts, and solutions you have in common and will be in touch
          soon!
        </CmTypography>

        <CmButton
          text="Shared Topics"
          onClick={handleSharedTopics}
          style={{ backgroundColor: 'transparent', borderColor: 'black' }}
        />

        <CloudDoneIcon style={{ fontSize: 200, fill: '#ffffff', }} />

        <CmTypography variant="h3" style={{ margin: 0 }}>
          Until then, why not create your own account?
        </CmTypography>

        <CmTypography variant="h4" style={{ marginTop: 20, marginBottom: 20 }}>
          Unlock the rest of your core values
        </CmTypography>

        <CmTypography variant="h4" style={{ margin: 0 }}>
          Explore your own personalized climate topics and solutions
        </CmTypography>

        <CmTypography variant="h4" style={{ marginTop: 20, marginBottom: 100 }}>
          Match with even more friends
        </CmTypography>
      </PageContent>

      <FooterAppBar bgColor={'#B9DEDF'}>
        {!conversation?.consent && (
          <CmButton
            text="Impacts"
            startIcon={<ChevronLeftIcon />}
            onClick={() => handleBackImpacts()}
            style={{
              backgroundColor: 'transparent',
              borderColor: 'black',
            }}
          />
        )}

        <CmButton
          color='userb'
          text="Create Account"
          disabled={!isSuccess}
          onClick={() => handleCreateAccount()}
          style={{ margin: 'auto' }}
        />
      </FooterAppBar>
    </Page>
  );
}

export default UserBSharedSuccessPage;
