import { useNavigate, useLocation } from 'react-router-dom';

import ROUTES from '../../router/RouteConfig';
import { capitalize } from '../../helpers/capitalize';
import { useCoreValues } from '../../hooks/useCoreValues';
import { useUserB } from '../../hooks/useUserB';
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { FooterAppBar } from 'features/userB/components';
import { PersonalValueCardSmall } from 'features/conversations/components';

function UserBCoreValuesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { personalValues } = useCoreValues();

  const userA = localStorage.getItem('userA') ?? '';

  const handleSharedValues = () => {
    navigate(`${ROUTES.USERB_SHARED_VALUES_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  function getOrdinalSuffix(i: number) {
    var j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  }

  return (
    <Page style={{ paddingBottom: 100 }}>
      <PageContent>
        <CmTypography variant="h1">Your top 3 core values!</CmTypography>

        {!personalValues && <CmLoader />}

        {personalValues?.map((value: any, index: any) => (
          <div key={value.id} style={{ marginTop: 20 }}>
            <PersonalValueCardSmall
              name={value.name}
              subTitle={(index + 1).toString() + getOrdinalSuffix(index + 1)}
              shortDescription={value.shortDescription}
            />
          </div>
        ))}

        <CmTypography variant="body" style={{ textAlign: 'center', marginTop: 50, marginBottom: 50 }}>
          Keep going to see how your core values match with{' '}
          {userA ? capitalize(userA) : 'your friend'} and understand how
          they can impact your thoughts and actions on climate change.
        </CmTypography>
      </PageContent>

      <FooterAppBar bgColor={'#B9DEDF'}>
        <CmButton text="Retake Quiz" onClick={() => {}} style={{ backgroundColor: 'transparent', borderColor: 'black' }} />
        <CmButton color='userb' text="Next: Shared Values" onClick={handleSharedValues} />
      </FooterAppBar>
    </Page>

  );
}

export default UserBCoreValuesPage;
