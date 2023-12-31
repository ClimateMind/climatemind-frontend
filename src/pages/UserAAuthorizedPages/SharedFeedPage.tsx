import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Box, Grid } from '@mui/material';

import Card from '../../components/Card/Card';
import CardHeader from '../../components/CardHeader';
import Loader from '../../components/Loader';
import PageSection from '../../components/PageSection';
import Wrapper from '../../components/Wrapper';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { Pil } from '../../components/Pil';
import { SharedSolutionsOverlay } from '../UserBPages/UserBSharedSolutionsPage';
import { SharedImpactsOverlay } from '../UserBPages/UserBSharedImpactsPage';
import PrevButton from '../../components/PrevButton';
import { ClimateApi } from '../../api/ClimateApi';
import { useSession } from '../../hooks/useSession';
import { useAuth } from '../../hooks/auth/useAuth';
import { CmTypography } from 'shared/components';

type UrlParamType = {
  conversationId: string;
};

function SharedFeedPage() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

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
                    <Card
                      header={
                        <CardHeader
                          title={effect.effectTitle}
                          preTitle={
                            effect?.isPossiblyLocal ? 'Local impact' : 'Impact'
                          }
                        />
                      }
                      index={index}
                      imageUrl={effect.imageUrl}
                      footer={
                        <SharedImpactsOverlay
                          impactIri={effect.effectId}
                          selectAction={<></>}
                        />
                      }
                    >
                      <div style={{ marginBottom: '16px' }}>
                        <CmTypography variant="body">
                          {effect.effectShortDescription}
                        </CmTypography>
                      </div>
                      {effect.relatedPersonalValues.map(
                        (relPersonalVal, ind) => (
                          <Pil text={relPersonalVal} key={ind}></Pil>
                        )
                      )}
                    </Card>
                  </div>
                ))}

                {data?.climateSolutions?.map((solution, index) => (
                  <div
                    data-testid={`TopicsSolutionCard-${solution.solutionId}-testid`}
                    key={index}
                  >
                    <Card
                      header={
                        <CardHeader
                          title={solution.solutionTitle}
                          preTitle={'Mitigation Action'}
                        />
                      }
                      index={index}
                      imageUrl={solution.imageUrl}
                      footer={
                        <SharedSolutionsOverlay
                          solutionIri={solution.solutionId}
                          selectAction={<></>}
                        />
                      }
                    >
                      <div style={{ marginBottom: '16px' }}>
                        <CmTypography variant="body">
                          {solution.solutionShortDescription}
                        </CmTypography>
                      </div>
                    </Card>
                  </div>
                ))}
              </>
            )}
          </PageSection>
        </Wrapper>
      </Grid>
    </main>
  );
}

export default SharedFeedPage;