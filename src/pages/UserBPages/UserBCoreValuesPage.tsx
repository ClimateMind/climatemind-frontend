import { useNavigate, useParams } from 'react-router-dom';

import ROUTES from '../../router/RouteConfig';
import { capitalize } from '../../helpers/capitalize';
import { CmButton, CmLoader, CmTypography, Page, PageContent } from 'shared/components';
import { FooterAppBar } from 'features/userB/components';
import { useAppSelector } from 'store/hooks';
import { PersonalValueCardSmall } from 'features/quiz/components';
import { useGetPersonalValues, useRetakeQuiz } from 'features/quiz/hooks';

function UserBCoreValuesPage() {
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const userAName = useAppSelector(state => state.userB.userAName);
  const { quizId } = useAppSelector(state => state.auth.userB);

  const { retakeQuizUserB } = useRetakeQuiz();
  const { personalValues } = useGetPersonalValues(quizId);

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

        {personalValues?.personalValues.map((value: any, index: any) => (
          <div key={value.id} style={{ marginTop: 20 }}>
            <PersonalValueCardSmall
              valueName={value.name}
              subTitle={(index + 1).toString() + getOrdinalSuffix(index + 1)}
              shortDescription={value.shortDescription}
            />
          </div>
        ))}

        <CmTypography variant="body" style={{ textAlign: 'center', marginTop: 50, marginBottom: 50 }}>
          Keep going to see how your core values match with{' '}
          {userAName ? capitalize(userAName) : 'your friend'} and understand how
          they can impact your thoughts and actions on climate change.
        </CmTypography>
      </PageContent>

      <FooterAppBar bgColor={'#B9DEDF'}>
        <CmButton text="Retake Quiz" onClick={() => retakeQuizUserB(conversationId ?? '')} style={{ backgroundColor: 'transparent', borderColor: 'black' }} />
        <CmButton color='userb' text="Next: Shared Values" onClick={() => navigate(`${ROUTES.USERB_SHARED_VALUES_PAGE}/${conversationId}`)} />
      </FooterAppBar>
    </Page>

  );
}

export default UserBCoreValuesPage;
