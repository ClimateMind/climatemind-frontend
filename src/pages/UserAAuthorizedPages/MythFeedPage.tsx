import React from 'react';
import { Box, Grid } from '@material-ui/core';

import { useQuery } from 'react-query';
import { ClimateApi } from '../../api/ClimateApi';
import Loader from '../../components/Loader';
import MythCard from '../../components/MythCard';
import PageContent from '../../components/PageContent';
import PageTitle from '../../components/PageTitle';
import Wrapper from '../../components/Wrapper';
import { useAuth } from '../../hooks/auth/useAuth';
import { useSession } from '../../hooks/useSession';
import Error500 from '../SharedPages/Error500Page';
import CmTypography from 'shared/components/CmTypography';

function MythFeedPage() {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const { data, isLoading, error } = useQuery(
    'myths',
    new ClimateApi(sessionId, accessToken).getMyths
  );

  if (error) return <Error500 />;

  return (
    <>
      <Wrapper bgColor="rgba(138, 213, 204, 0.6)">
        <PageContent>
          <PageTitle>Climate change myths</PageTitle>
          <Box mb={3} px={5} textAlign="center">
            <CmTypography variant="h4">
              Arm yourself with information to challenge these common myths and
              be part of the solution to fight climate change!
            </CmTypography>
          </Box>

          <Grid container>
            {isLoading && <Loader />}
            {data?.myths.map((myth, i) => (
              <MythCard myth={myth} key={i} />
            ))}
          </Grid>
        </PageContent>
      </Wrapper>
    </>
  );
}

export default MythFeedPage;
