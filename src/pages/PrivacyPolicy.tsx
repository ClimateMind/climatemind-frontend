import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { COLORS } from '../common/styles/CMTheme';
import Button from '../components/Button';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import PrevButton from '../components/PrevButton';
import PrivacyPolicyText from '../components/PrivacyPolicyText';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Wrapper from '../components/Wrapper';

const PrivacyPolicy: React.FC = () => {
  const history = useHistory();

  return (
    <Wrapper bgColor={COLORS.PRIMARY}>
      <PageContent>
        <ScrollToTopOnMount />

        <PageTitle>Privacy Policy</PageTitle>

        <Box py={2} mt={-4}>
          <PrevButton clickPrevHandler={() => history.goBack()} />
        </Box>

        <PrivacyPolicyText />

        <Grid item container justify="center">
          <Box my={4}>
            <Button variant="contained" onClick={() => history.goBack()}>
              Go Back
            </Button>
          </Box>
        </Grid>
      </PageContent>
    </Wrapper>
  );
};

export default PrivacyPolicy;
