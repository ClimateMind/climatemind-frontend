import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import ROUTES_CONFIG from '../../router/RouteConfig';
import Wrapper from '../../components/Wrapper';
import { capitalize } from '../../helpers/capitalize';
import { useAlignment } from '../../hooks/useAlignment';
import { useUserB } from '../../hooks/useUserB';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { ClimateApi } from '../../api/ClimateApi';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { CmButton, CmTypography } from 'shared/components';

function UserBSharedSuccessPage() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { conversation } = useGetOneConversation(conversationId ?? '');
  const { alignmentScoresId, setAlignmentScoresId } = useAlignment();

  const { data, isSuccess } = useQuery(
    ['summary', alignmentScoresId],
    async () => {
      if (alignmentScoresId && alignmentScoresId !== '') {
        return await new ClimateApi(sessionId, accessToken).getSummary(
          alignmentScoresId
        );
      }

      if (alignmentScoresId === '' && conversationId) {
        const result = await new ClimateApi(
          sessionId,
          accessToken
        ).getOneConversation(conversationId);
        setAlignmentScoresId(result.alignmentScoresId!);
        return await new ClimateApi(sessionId, accessToken).getSummary(
          result.alignmentScoresId!
        );
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
    return <Loader></Loader>;
  }

  return (
    <main>
      <Grid
        container
        style={{ minHeight: '60vh' }}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
          <PageSection>
            <CmTypography variant='h1'>Shared!</CmTypography>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 120,
              }}
            >
              <CmTypography variant="h3">
                {capitalize(data?.userAName!)} can now see which values,
                impacts, and solutions you have in common and will be in touch
                soon!
              </CmTypography>
              <CmButton
                text="Shared Topics"
                onClick={handleSharedTopics}
                style={{ backgroundColor: 'transparent', borderColor: 'black' }}
              />
            </div>

            <Box textAlign="center">
              <CloudDoneIcon
                style={{
                  transform: 'scale(8)',
                  fill: '#ffffff',
                }}
              />
            </Box>

            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ minHeight: '60vh' }}
              spacing={1}
            >
              <Box textAlign="center" mt={14}>
                <CmTypography variant="h3" style={{ margin: 0 }}>
                  Until then, why not create your own account?
                </CmTypography>
              </Box>

              <Box textAlign="center" mt={2}>
                <CmTypography variant="h4" style={{ margin: 0 }}>
                  Unlock the rest of your core values
                </CmTypography>
              </Box>

              <Box textAlign="center" mt={3}>
                <CmTypography variant="h4" style={{ margin: 0 }}>
                  Explore your own personalized climate topics and solutions
                </CmTypography>
              </Box>

              <Box textAlign="center" mt={3}>
                <CmTypography variant="h4" style={{ margin: 0 }}>
                  Match with even more friends
                </CmTypography>
              </Box>
            </Grid>

            <FooterAppBar bgColor={COLORS.ACCENT10}>
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
                text="Create Account"
                disabled={!isSuccess}
                onClick={() => handleCreateAccount()}
                style={{ margin: 'auto' }}
              />
            </FooterAppBar>
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
}

export default UserBSharedSuccessPage;
