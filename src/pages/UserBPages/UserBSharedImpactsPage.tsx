import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import { COLORS } from '../../common/styles/CMTheme';
import CardHeader from '../../components/CardHeader';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import ROUTES_CONFIG from '../../router/RouteConfig';
import Wrapper from '../../components/Wrapper';
import { useAlignment } from '../../hooks/useAlignment';
import { useSharedImpacts } from '../../hooks/useSharedImpacts';
import Error500 from '../SharedPages/Error500Page';
import { useErrorLogging } from '../../hooks/useErrorLogging';
import { useUserB } from '../../hooks/useUserB';
import { ClimateApi } from '../../api/ClimateApi';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { CmButton, CmChip, CmTypography, TabbedContent } from 'shared/components';
import { UserBSharedImpactCard, UserBSharedImpactDetailsModal } from 'features/userB/components';
import CardOverlay from 'components/CardOverlay';
import Paragraphs from 'components/Paragraphs';
import SourcesList from 'components/SourcesList';
import { CardCloseEvent, CardOpenEvent, analyticsService } from 'services';

interface SharedImpactsOverlayProps {
  impactIri: string | undefined;
  selectAction: React.ReactNode;
}
// TODO: [CM-1097] Break <SharedImpactsOverlay/> into an new file and refactor api call into a hook.
export const SharedImpactsOverlay: React.FC<SharedImpactsOverlayProps> = ({
  impactIri,
  selectAction,
}) => {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const { data, isSuccess } = useQuery(['impactDetails', impactIri], () => {
    if (impactIri) {
      return new ClimateApi(sessionId, accessToken).getImpactDetails(impactIri);
    }
  });

  return (
    <div>
      {isSuccess && (
        <div style={{ marginTop: '-20px' }}>
          <CardOverlay
            iri="1"
            title="Overlay Title"
            cardHeader={<CardHeader title={data?.effectTitle} />}
            imageUrl={data?.imageUrl}
            selectAction={selectAction}
          >
            <TabbedContent
              details={
                <Box p={3}>
                  <Paragraphs text={data?.longDescription} />
                  <Box mt={3}>
                    {data?.relatedPersonalValues.map((pv, index) => (
                      <CmChip key={`${pv}-${index}`} text={pv} />
                    ))}
                  </Box>
                </Box>
              }
              sources={<SourcesList sources={data?.effectSources} />}
            />
          </CardOverlay>
        </div>
      )}
    </div>
  );
};

function UserBSharedImpactsPage() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

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
      new ClimateApi(sessionId, accessToken).postSharedImpacts({
        alignmentScoresId,
        effectId,
      }),
    {
      onSuccess: (response: { message: string }) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(response.message);
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
    <main>
      <Grid
        container
        style={{
          minHeight: '100vh',
        }}
        data-testid="PersonalValues"
        justifyContent="space-around"
      >
        {/* --- */}

        <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
          <PageSection>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <CmTypography variant='h1'>Climate impacts you and {userAName} share</CmTypography>

                <Box textAlign="center">
                  <CmTypography variant="h4">
                    Select one impact of climate change you’d be interested in
                    talking to {userAName} about.
                  </CmTypography>
                </Box>

                <Box textAlign="center" pt={4} pb={4}>
                  <CmTypography variant="body">
                    These topics already align with your shared core values, so
                    it’ll be easy to start having meaningful conversations.
                  </CmTypography>
                </Box>

                {impacts?.map((impact) => (
                  <UserBSharedImpactCard
                    {...impact}
                    onLearnMore={(effectId) => learnMoreHandler(effectId)}
                    isSelected={effectId === impact.effectId}
                    onSelected={(effectId) => handleSelectImpact(effectId)}
                    disabled={effectId !== '' && effectId !== impact.effectId}
                    style={{ marginBottom: 20 }}
                    key={impact.effectId}
                  />
                ))}

                <FooterAppBar bgColor={COLORS.ACCENT10}>
                  <CmTypography variant="button">
                    Selected {numberOfSelected} of 1
                  </CmTypography>
                  <CmButton
                    text='Next: Solutions'
                    disabled={!effectId}
                    onClick={handleNextSolutions}
                  />
                </FooterAppBar>
              </>
            )}

            {showDetailsModal && (
              <UserBSharedImpactDetailsModal
                showDetails={showDetailsModal !== null}
                {...findImpact(showDetailsModal)}
                onClose={closeCardHandler}
              />
            )}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
}

export default UserBSharedImpactsPage;
