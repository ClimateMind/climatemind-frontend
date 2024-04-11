import { useNavigate, useParams } from 'react-router-dom';

import { capitalize } from '../../helpers/capitalize';
import { CmBackButton, CmTypography, Page, PageContent } from 'shared/components';
import { PersonalValueCardSmall } from 'features/quiz';
import ViewSelectedTopics from 'features/conversations/components/ViewSelectedTopics';
import { useConversation } from 'features/conversations';
import { useAlignment } from 'features/userB';

function SharedValuesPage() {
  const navigate = useNavigate();

  const { conversationId } = useParams();
  const { conversation } = useConversation(conversationId ?? '');

  const { alignmentScores } = useAlignment(conversation?.alignmentScoresId);
  const topSharedValue = alignmentScores.data?.valueAlignment[0];

  return (
    <Page>
      <CmBackButton onClick={() => navigate(-1)} style={{ padding: 20 }} />
      <PageContent style={{ marginTop: -40, textAlign: 'center' }}>
        <CmTypography variant="h1">Your shared core values!</CmTypography>

        {conversation && <CmTypography variant="h3">How do your values align with {capitalize(conversation.userB.name)}'s?</CmTypography>}

        <CmTypography variant="body">Understanding your shared core values will help you identify how to tackle climate topics and solutions with friends.</CmTypography>

        <CmTypography variant="h2">Top Shared Core Value</CmTypography>

        {topSharedValue && <PersonalValueCardSmall valueName={topSharedValue.name} shortDescription={topSharedValue.description} subTitle={`${topSharedValue.score.toString()}% match`} />}

        <CmTypography variant="h3">Overall Similarity</CmTypography>
        <CmTypography variant="h2">{alignmentScores.data?.overallSimilarityScore}%</CmTypography>

        {conversation && <ViewSelectedTopics conversationState={conversation.state} conversationId={conversationId ?? ''} style={{ marginBottom: 20 }} />}
      </PageContent>
    </Page>
  );
}

export default SharedValuesPage;
