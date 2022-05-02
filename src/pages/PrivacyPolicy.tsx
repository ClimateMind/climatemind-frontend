import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { COLORS } from '../common/styles/CMTheme';
import { Button } from '../components/Button';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import PrevButton from '../components/PrevButton';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import Wrapper from '../components/Wrapper';
import { makeStyles } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';
import markdown from '../PrivacyPolicy';

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
    <Wrapper bgColor={COLORS.PRIMARY}>
      <PageContent>
        <ScrollToTopOnMount />

        <PageTitle>Privacy Policy</PageTitle>

        <Box py={2} mt={-4}>
          <PrevButton clickPrevHandler={() => history.goBack()} />
        </Box>

        {/* Privacy Policy Rendered from markdown file. */}
        <ReactMarkdown className={classes.root} children={markdown} />

        <Grid item container justifyContent="center">
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
