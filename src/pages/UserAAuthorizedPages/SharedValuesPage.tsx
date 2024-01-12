import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { capitalize } from '../../helpers/capitalize';
import { useSharedValues } from '../../hooks/useSharedValues';
import Error500 from '../SharedPages/Error500Page';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { CmBackButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import ViewSelectedTopics from 'features/conversations/components/ViewSelectedTopics';
import PersonalValueCardSmall from 'features/quiz/components/PersonalValueCardSmall';

type UrlParamType = {
  conversationId: string;
};

function SharedValuesPage() {
  const { data, isLoading, isError } = useSharedValues();
  const topSharedValue = data?.valueAlignment?.[0];
  const navigate = useNavigate();
  const location = useLocation();

  const { conversationId } = useParams<UrlParamType>();
  const { conversation } = useGetOneConversation(conversationId ?? '');

  if (isError) return <Error500 />;

  if (isLoading || !conversation)
    return (
      <div style={{ backgroundColor: 'rgba(138, 213, 204, 0.6)' }}>
        <div style={{
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
      paddingTop: '2em',
    }}>
          <CmLoader />
        </div>
      </div>
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
      <PageContent style={{ marginTop: -40, textAlign: 'center' }}>
        <CmTypography variant="h1">Your shared core values!</CmTypography>

        <CmTypography variant="h3">
          How do your values align with {capitalize(data?.userBName!)}'s?
        </CmTypography>

        <CmTypography variant="body">
          Understanding your shared core values will help you identify how to
          tackle climate topics and solutions with friends.
        </CmTypography>

        <CmTypography variant="h2">Top Shared Core Value</CmTypography>

        {topSharedValue && (
          <PersonalValueCardSmall
            name={topSharedValue.name}
            shortDescription={topSharedValue.description}
            subTitle={`${topSharedValue.score!.toString()}% match`}
          />
        )}

        <CmTypography variant="h3">Overall Similarity</CmTypography>
        <CmTypography variant="h2">{data?.overallSimilarityScore}%</CmTypography>

        <ViewSelectedTopics conversationState={conversation.state} conversationId={conversationId ?? ''} style={{ marginBottom: 20 }} />
      </PageContent>
    </Page>
  );
}

export default SharedValuesPage;
