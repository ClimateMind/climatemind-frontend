import { useNavigate, useLocation } from 'react-router-dom';

import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import ROUTES_CONFIG from '../../router/RouteConfig';
import { capitalize } from '../../helpers/capitalize';
import { useSharedValues } from '../../hooks/useSharedValues';
import Error500 from '../SharedPages/Error500Page';
import { useUserB } from '../../hooks/useUserB';
import { CmButton, CmTypography, Page, PageContent } from 'shared/components';
import { PersonalValueCardSmall } from 'features/conversations/components';

function UserBSharedValuesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError } = useSharedValues();
  const { conversationId } = useUserB();
  const topSharedValue = data?.valueAlignment?.[0];

  if (isError) return <Error500 />;

  const handleSharedImpacts = () => {
    navigate(`${ROUTES_CONFIG.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  return (
    <Page style={{ paddingBottom: 100 }}>
      <PageContent>
        <CmTypography variant="h1">Your shared core values with {`${capitalize(data?.userAName as string)}`}!</CmTypography>

        <CmTypography variant="body" style={{ textAlign: 'center' }}>
          Understanding your shared core values will help you identify how
          to tackle climate topics and solutions with{' '}
          {` ${capitalize(data?.userAName as string)}`}.
        </CmTypography>

        <CmTypography variant="h3">Top Shared Core Value</CmTypography>

        {isLoading && <Loader />}

        {!isLoading && topSharedValue && (
          <PersonalValueCardSmall
            name={topSharedValue.name}
            subTitle={`${topSharedValue.score!.toString()}% match with ${capitalize(data?.userAName as string)}`}
            shortDescription={topSharedValue.description}
          />
        )}

        <CmTypography variant="h3" style={{ marginTop: 50, marginBottom: 0 }}>Overall Similarity</CmTypography>
        <CmTypography variant="h2">{data?.overallSimilarityScore}%</CmTypography>
      </PageContent>

      <FooterAppBar align="center" bgColor={COLORS.ACCENT10}>
        <CmButton color='userb' text="Next: Shared Impacts" onClick={handleSharedImpacts} />
      </FooterAppBar>
    </Page>
  );
}

export default UserBSharedValuesPage;
