import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { CmBackButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { ClimateFeedCard } from 'features/climate-feed/components';
import { SolutionFeedCard } from 'features/solution-feed/components';
import { UserBSharedImpactDetailsModal, UserBSharedSolutionDetailsModal } from 'features/userB/components';
import { climateEffect, climateSolution } from 'types/SelectedTopics';
import { useApiClient } from 'shared/hooks';

type UrlParamType = {
  conversationId: string;
};

function SharedFeedPage() {
  const apiClient = useApiClient();

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
        return apiClient.getSelectedTopics(conversationId);
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
    <Page>
      <CmBackButton onClick={handleGoBack} style={{ padding: 20 }} />
      <PageContent style={{ marginTop: -40 }}>
        <CmTypography variant='h1'>Your shared feed with {conversation?.userB?.name}</CmTypography>

        <CmTypography variant="h4">
          These are climate effects that matter to you both; great
          starting point for having a constructive conversation.
        </CmTypography>

        {isLoading && <CmLoader />}

        {data?.climateEffects?.map((effect) => (
          <div key={effect.effectId} style={{ marginTop: 20, marginBottom: 20 }}>
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

        {data?.climateSolutions?.map((solution) => (
          <div key={solution.solutionId} style={{ marginBottom: 20 }}>
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

        <UserBSharedImpactDetailsModal {...impactDetails!} showDetails={showImpactDetailsModal} onClose={() => setShowImpactDetailsModal(false)} />
        <UserBSharedSolutionDetailsModal {...solutionDetails!} showDetails={showSolutionDetailsModal} onClose={() => setShowSolutionDetailsModal(false)} />
      </PageContent>
    </Page>
  );
}

export default SharedFeedPage;
