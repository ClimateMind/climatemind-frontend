import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import PrevButton from '../components/PrevButton';
import Wrapper from '../components/Wrapper';
import markdown from '../PrivacyPolicy';
import PageWithAppBar from '../templates/PageWithAppBar';

const PrivacyPolicy: React.FC = () => {
  const history = useHistory();

  const styles = makeStyles({
    root: {
      flexGrow: 1,
      minHeight: '100vh',
      maxWidth: '100%',
      color: COLORS.DK_TEXT,
      fontFamily: 'Bilo',
      '& h1': {
        fontFamily: 'atten-round-new',
        fontSize: '48px',
        fontWeight: 900,
      },
      '& h2': {
        fontSize: '32px',
        fontWeight: 900,
      },
      '& h3': {
        fontFamily: 'atten-round-new',
        fontSize: '32px',
        fontWeight: 900,
      },
      '& h4': {
        fontSize: '24px',
        fontWeight: 900,
        letterSpacing: '1.6pt',
      },
      '& a, a:active, a:visited': {
        color: COLORS.SUCCESS,
      },
    },
  });

  const classes = styles();

  return (
    <PageWithAppBar>
      <Wrapper bgColor={COLORS.PRIMARY}>
        <PageContent>
          <PageTitle>Privacy Policy</PageTitle>

          <Box py={2} mt={-4}>
            <PrevButton clickPrevHandler={() => history.goBack()} />
          </Box>

          {/* Privacy Policy Rendered from markdown file. */}
          <ReactMarkdown
            className={classes.root}
            children={markdown}
          />

          <Grid item container justifyContent="center">
            <Box my={4}>
              <Button
                variant="contained"
                onClick={() => history.goBack()}
              >
                Go Back
              </Button>
            </Box>
          </Grid>
        </PageContent>
      </Wrapper>
    </PageWithAppBar>
  );
};

export default PrivacyPolicy;
