import { Box, Grid } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import Loader from '../../components/Loader';
import { ValueCard } from '../../components/ValueCard/ValueCard';
import { capitalize } from '../../helpers/capitalize';
import { useSharedValues } from '../../hooks/useSharedValues';
import Error500 from '../SharedPages/Error500Page';
import PrevButton from '../../components/PrevButton';
import { ViewSelectedTopics } from '../../components/ViewSelectedTopics';
import { useGetOneConversation } from '../../hooks/useGetOneConversation';
import { CmTypography } from 'shared/components';

type UrlParamType = {
  conversationId: string;
};

function SharedValuesPage() {
  const { data, isLoading, isError } = useSharedValues();
  const isXs = false;
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
          <Loader />
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
    <div style={{ backgroundColor: 'rgba(138, 213, 204, 0.6)' }}>
      <div style={{
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
      paddingTop: '2em',
    }}>
        <Grid item xs={3} style={{ height: '24px' }}>
          <PrevButton text="Back" clickPrevHandler={handleGoBack} />
        </Grid>

        <CmTypography variant="h1">Your shared core values!</CmTypography>

        <Box>
          <CmTypography variant="h3">
            How do your values align with {` ${capitalize(data?.userBName as string)}'`}s?
          </CmTypography>
        </Box>

        <Box textAlign="center" pb={2}>
          <CmTypography variant="body">
            Understanding your shared core values will help you identify how to
            tackle climate topics and solutions with friends.
          </CmTypography>
        </Box>
        <Box textAlign="center" pb={2}>
          <CmTypography variant="h2">
            Top Shared Core Value
          </CmTypography>
        </Box>

        {topSharedValue ? (
          <Box mt={isXs ? 0 : 2}>
            <ValueCard
              valueId={topSharedValue.id}
              valueName={topSharedValue.name}
              valueDescription={topSharedValue.description}
              matchPercent={topSharedValue.score}
            />
          </Box>
        ) : null}

        <Box textAlign="center" mt={6}>
          <Box mt={4}>
            <CmTypography variant="h3">Overall Similarity</CmTypography>
            <CmTypography variant="h2">
                {data?.overallSimilarityScore}%
            </CmTypography>
          </Box>
        </Box>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60, marginBottom: 30 }}>
          <ViewSelectedTopics
            conversationState={conversation.state}
            conversationId={conversationId ?? ''}
          />
        </div>
      </div>
    </div>
  );
}

export default SharedValuesPage;
