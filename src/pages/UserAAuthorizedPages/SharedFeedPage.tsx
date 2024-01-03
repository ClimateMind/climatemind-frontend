import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import Wrapper from '../../components/Wrapper';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import PrevButton from '../../components/PrevButton';
import { ClimateApi } from '../../api/ClimateApi';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { CmTypography } from 'shared/components';
import { ClimateFeedCard } from 'features/climate-feed/components';
import { SolutionFeedCard } from 'features/solution-feed/components';
import { UserBSharedImpactDetailsModal, UserBSharedSolutionDetailsModal } from 'features/userB/components';
import { climateEffect, climateSolution } from 'types/SelectedTopics';

type UrlParamType = {
  conversationId: string;
};

function SharedFeedPage() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [impactDetails, setImpactDetails] = useState<climateEffect>();
  const [showImpactDetailsModal, setShowImpactDetailsModal] = useState(false);

  const [solutionDetails, setSolutionDetails] = useState<climateSolution>();
  const [showSolutionDetailsModal, setShowSolutionDetailsModal] = useState(false);

  const { conversationId } = useParams<UrlParamType>();

  const { conversation } = useGetOneConversation(conversationId ?? '');

  const { data, isLoading } = useQuery(
    ['selectedTopics', conversationId],
    () => {
      if (conversationId) {
        return new ClimateApi(sessionId, accessToken).getSelectedTopics(
          conversationId
        );
      }
    }
  );

  const handleGoBack = () => {
    if (location.state?.from && location.state?.id) {
      navigate(location.state.from, {
        state: { from: location.pathname, id: location.state.id },
      });
    } else {
      navigate(-1);
    }
  };

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
                <Grid item xs={3} style={{
                  height: '24px',
                }}>
                  <PrevButton text="Back" clickPrevHandler={handleGoBack} />
                </Grid>
                <CmTypography variant='h1'>
                  Your shared feed with {conversation?.userB?.name}
                </CmTypography>

                <Box textAlign="center" pb={3}>
                  <CmTypography variant="h4">
                    These are climate effects that matter to you both; great
                    starting point for having a constructive conversation.
                  </CmTypography>
                </Box>

                {data?.climateEffects?.map((effect, index) => (
                  <div
                    data-testid={`TopicsEffectCard-${effect.effectId}-testid`}
                    key={index}
                  >
                    <ClimateFeedCard
                      {...effect}
                      preTitle='IMPACT'
                      effectSolutions={[]}
                      onLearnMore={() => {
                        setImpactDetails(effect);
                        setShowImpactDetailsModal(true);
                      }}
                    />
                  </div>
                ))}

                {data?.climateSolutions?.map((solution, index) => (
                  <div
                    style={{ marginTop: 20 }}
                    key={index}
                  >
                    <SolutionFeedCard
                      {...solution}
                      solutionType={solution.solutionType[0]}
                      iri={solution.solutionId}
                      shortDescription={solution.solutionShortDescription}
                      onLearnMore={() => {
                        setSolutionDetails(solution);
                        setShowSolutionDetailsModal(true);
                      }}
                    />
                  </div>
                ))}
              </>
            )}

            <UserBSharedImpactDetailsModal
              {...impactDetails!}
              showDetails={showImpactDetailsModal}
              onClose={() => setShowImpactDetailsModal(false)}
            />

            <UserBSharedSolutionDetailsModal
              {...solutionDetails!}
              showDetails={showSolutionDetailsModal}
              onClose={() => setShowSolutionDetailsModal(false)}
            />
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
}

export default SharedFeedPage;
