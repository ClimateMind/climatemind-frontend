import { useNavigate, useParams } from 'react-router-dom';

import ROUTES_CONFIG from '../../router/RouteConfig';
import { capitalize } from '../../helpers/capitalize';
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { FooterAppBar } from 'features/userB/components';
import { useAlignment } from 'features/userB';
import { PersonalValueCardSmall } from 'features/quiz/components';
// import { useConversation } from 'features/conversations';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store/store';
import { useEffect } from 'react';
function UserBSharedValuesPage() {
  const quizId2 = useAppSelector((state) => state.auth.userA.quizId);
  const { alignmentScoresId } = useAppSelector((state: RootState) => state.userB);
  console.log('alignscores', alignmentScoresId);
  const navigate = useNavigate();
  const { createAlignment } = useAlignment();

  const { conversationId } = useParams();
  // const { conversation } = useConversation(conversationId ?? '');

  const id = localStorage.getItem('alignmentScoresId') ?? '';
  localStorage?.setItem('quizIdUserB', quizId2);
  let quizId = localStorage.getItem('quizId');
  const { alignmentScores } = useAlignment(id);
  console.log('conversation', conversationId, 'quiz', quizId, 'quizid2', quizId2);

  useEffect(() => {
    // this contained conversation.alignmentScoresId
    if (quizId2) localStorage.setItem('quizIdUserB', quizId2);

    if (conversationId && quizId) {
      createAlignment(conversationId, quizId);
    }

    if (alignmentScoresId) {
      localStorage?.setItem('alignmentScoresId', alignmentScoresId.alignmentScoresId ?? '');
    }
  }, [conversationId, quizId, alignmentScoresId]);

  return (
    <Page style={{ paddingBottom: 100 }}>
      <PageContent>
        {alignmentScores.isPending && <CmLoader />}

        {!alignmentScores.isPending && alignmentScores.data && (
          <>
            <CmTypography variant="h1">Your shared core values with {capitalize(alignmentScores.data.userAName)}!</CmTypography>

            <CmTypography variant="body" style={{ textAlign: 'center' }}>
              Understanding your shared core values will help you identify how to tackle climate topics and solutions with {capitalize(alignmentScores.data.userAName)}.
            </CmTypography>

            <CmTypography variant="h3">Top Shared Core Value</CmTypography>

            <PersonalValueCardSmall
              valueName={alignmentScores.data.valueAlignment[0].name}
              subTitle={`${alignmentScores.data.valueAlignment[0].score.toString()}% match with ${capitalize(alignmentScores.data.userAName)}`}
              shortDescription={alignmentScores.data.valueAlignment[0].description}
            />

            <CmTypography variant="h3" style={{ marginTop: 50, marginBottom: 0 }}>
              Overall Similarity
            </CmTypography>
            <CmTypography variant="h2">{alignmentScores.data.overallSimilarityScore}%</CmTypography>
          </>
        )}
      </PageContent>

      <FooterAppBar align="center" bgColor={'#B9DEDF'}>
        <CmButton color="userb" text="Next: Shared Impacts" onClick={() => navigate(`${ROUTES_CONFIG.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`)} />
      </FooterAppBar>
    </Page>
  );
}

export default UserBSharedValuesPage;
