import { useNavigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import ROUTES from '../../router/RouteConfig';
import { ValueCard } from '../../components/ValueCard';
import { capitalize } from '../../helpers/capitalize';
import { useCoreValues } from '../../hooks/useCoreValues';
import useRetakeQuiz from '../../hooks/useRetakeQuiz';
import { useUserB } from '../../hooks/useUserB';
import { CmButton, CmTypography } from 'shared/components';

// TODO: Add the real values

function UserBCoreValuesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId } = useUserB();
  const { personalValues } = useCoreValues();
  const { retakeQuiz } = useRetakeQuiz();

  const userA = localStorage.getItem('userA') ?? '';

  const handleSharedValues = () => {
    navigate(`${ROUTES.USERB_SHARED_VALUES_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: 'rgba(138, 213, 204, 0.6)',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '640px',
            margin: '0 auto',
            padding: '0 1em',
          }}
        >
          {/* Centered Page Title */}

          <CmTypography variant="h1">Your top 3 core values!</CmTypography>

          {/* Top 3 Values Cards */}

          {!personalValues && <Loader />}

          {personalValues?.map((value, index) => (
            <div data-testid={`ValueCard-${index}`}>
              <ValueCard
                valueId={value.id}
                valueDescription={value.shortDescription}
                valueName={value.name}
                position={index + 1}
              />
            </div>
          ))}

          <Box textAlign="center" my={5} height="150px">
            <CmTypography variant="body">
              Keep going to see how your core values match with{' '}
              {userA ? capitalize(userA) : 'your friend'} and understand how
              they can impact your thoughts and actions on climate change.
            </CmTypography>
          </Box>

          <FooterAppBar bgColor={COLORS.ACCENT10}>
            <CmButton
              text="Retake Quiz"
              onClick={retakeQuiz}
              style={{ backgroundColor: 'transparent', borderColor: 'black' }}
            />

            <CmButton text="Next: Shared Values" onClick={handleSharedValues} />
          </FooterAppBar>
        </div>
      </div>
    </>
  );
}

export default UserBCoreValuesPage;
