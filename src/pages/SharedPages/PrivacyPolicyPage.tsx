import React from 'react';
import { useNavigate } from 'react-router';
import { Box, Grid, makeStyles } from '@material-ui/core';

import { COLORS } from '../../common/styles/CMTheme';
import { Button } from '../../components/Button';
import PageContent from '../../components/PageContent';
import PageTitle from '../../components/PageTitle';
import PrevButton from '../../components/PrevButton';
import Wrapper from '../../components/Wrapper';
import ReactMarkdown from 'react-markdown';
import markdown from '../../PrivacyPolicy';

function PrivacyPolicyPage() {
  const navigate = useNavigate();

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
        <PageTitle>Privacy Policy</PageTitle>

        <Box py={2} mt={-4}>
          <PrevButton clickPrevHandler={() => navigate(-1)} />
        </Box>

        {/* Privacy Policy Rendered from markdown file. */}
        <ReactMarkdown className={classes.root} children={markdown} />

        <Grid item container justifyContent="center">
          <Box my={4}>
            <Button variant="contained" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Box>
        </Grid>
      </PageContent>
    </Wrapper>
  );
}

export default PrivacyPolicyPage;
