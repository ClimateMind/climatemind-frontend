import { useNavigate, useParams } from 'react-router-dom';

import ROUTES_CONFIG from '../../router/RouteConfig';
import { capitalize } from '../../helpers/capitalize';
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { PersonalValueCardSmall } from 'features/conversations/components';
import { FooterAppBar } from 'features/userB/components';
import { useAppSelector } from 'store/hooks';
import { useAlignment } from 'features/userB';

function UserBSharedValuesPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const quizId = useAppSelector(state => state.auth.userB.quizId);
  const { isLoading, alignmentScores } = useAlignment(conversationId ?? '', quizId);

  return (
    <Page style={{ paddingBottom: 100 }}>
      <PageContent>
        {isLoading && <CmLoader />}

        {!isLoading && alignmentScores && (
          <>
            <CmTypography variant="h1">Your shared core values with {capitalize(alignmentScores.userAName)}!</CmTypography>

            <CmTypography variant="body" style={{ textAlign: 'center' }}>
              Understanding your shared core values will help you identify how
              to tackle climate topics and solutions with {capitalize(alignmentScores.userAName)}.
            </CmTypography>

            <CmTypography variant="h3">Top Shared Core Value</CmTypography>

            <PersonalValueCardSmall
              name={alignmentScores.valueAlignment[0].name}
              subTitle={`${alignmentScores.valueAlignment[0].score.toString()}% match with ${capitalize(alignmentScores.userAName)}`}
              shortDescription={alignmentScores.valueAlignment[0].description}
            />

            <CmTypography variant="h3" style={{ marginTop: 50, marginBottom: 0 }}>Overall Similarity</CmTypography>
            <CmTypography variant="h2">{alignmentScores.overallSimilarityScore}%</CmTypography>
          </>
        )}
      </PageContent>

      <FooterAppBar align="center" bgColor={'#B9DEDF'}>
        <CmButton color='userb' text="Next: Shared Impacts" onClick={() => navigate(`${ROUTES_CONFIG.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`)} />
      </FooterAppBar>
    </Page>
  );
}

export default UserBSharedValuesPage;
