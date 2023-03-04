import { Grid } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import { ClimateApi } from '../api/ClimateApi';
import { COLORS } from '../common/styles/CMTheme';
import Loader from '../components/Loader';
import MythCard from '../components/MythCard';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import Wrapper from '../components/Wrapper';
import { useAuth } from '../hooks/auth/useAuth';
import { useSession } from '../hooks/useSession';
import Error500 from './Error500';

const MythFeed: React.FC = () => {
  const { sessionId } = useSession();
  const { accessToken } = useAuth();

  const { data, isLoading, error } = useQuery(
    'myths',
    new ClimateApi(sessionId, accessToken).getMyths
  );

  if (error) return <Error500 />;

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT4}>
        <PageContent>
          <PageTitle>Climate Mind is against misinformation.</PageTitle>

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
};

export default MythFeed;
