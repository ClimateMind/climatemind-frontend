import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import ROUTES_CONFIG from '../../router/RouteConfig';
import { ValueCard } from '../../components/ValueCard/ValueCard';
import { capitalize } from '../../helpers/capitalize';
import { useSharedValues } from '../../hooks/useSharedValues';
import Error500 from '../SharedPages/Error500Page';
import { useUserB } from '../../hooks/useUserB';
import { CmButton, CmTypography } from 'shared/components';

function UserBSharedValuesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading, isError } = useSharedValues();
  const { conversationId } = useUserB();
  const isXs = false;
  const topSharedValue = data?.valueAlignment?.[0];

  if (isError) return <Error500 />;

  if (isLoading)
    return (
      <div
        style={{
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
          <Loader />
        </div>
      </div>
    );

  const handleSharedImpacts = () => {
    navigate(`${ROUTES_CONFIG.USERB_SHARED_IMPACTS_PAGE}/${conversationId}`, {
      state: { from: location.pathname, id: conversationId },
    });
  };

  return (
    <>
      <div
        style={{
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
          <CmTypography variant="h1">
            Your shared core values with {`${capitalize(data?.userAName as string)}`}!
          </CmTypography>

          <Box textAlign="center" mt={isXs ? -2 : -7} pb={4}>
            <CmTypography variant="body">
              Understanding your shared core values will help you identify how
              to tackle climate topics and solutions with{' '}
              {` ${capitalize(data?.userAName as string)}`}.
            </CmTypography>
          </Box>
          <Box textAlign="center">
            <CmTypography variant="h3">Top Shared Core Value</CmTypography>
          </Box>

          {topSharedValue ? (
            <Box mt={isXs ? 0 : 2}>
              <ValueCard
                valueId={topSharedValue.id}
                valueName={topSharedValue.name}
                valueDescription={topSharedValue.description}
                matchPercent={topSharedValue.score}
                username={capitalize(data?.userAName as string)}
              />
            </Box>
          ) : null}

          <Box textAlign="center" mt={6} pb={8}>
            <Box mt={4}>
              <CmTypography variant="h3">Overall Similarity</CmTypography>
              <CmTypography variant="h2">
                {data?.overallSimilarityScore}%
              </CmTypography>
            </Box>
          </Box>

          <FooterAppBar align="center" bgColor={COLORS.ACCENT10}>
            <Toolbar>
              <CmButton
                text="Next: Shared Impacts"
                onClick={handleSharedImpacts}
              />
            </Toolbar>
          </FooterAppBar>
        </div>
      </div>
    </>
  );
}

export default UserBSharedValuesPage;
