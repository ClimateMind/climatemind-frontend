import {
  Box,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { COLORS } from '../common/styles/CMTheme';
// import { useHistory } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { ValueCard } from '../components/ValueCard';
import FooterAppBar from '../components/FooterAppBar';
// import { useAlignment } from '../hooks/useAlignment';

const styles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: COLORS.ACCENT12,
    },
    typography: {
      textAlign: 'center',
    },
    container: {
      textAlign: 'center',
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0 1em',
    },
  };
});

// Remove me to a separate file later
const dummyTopValue: any = {
  description:
    'The sense of security that comes with feeling like you belong highly motivates you. Comfort for you is knowing the people and things you cherish are taken care of.',
  id: 'security',
  name: 'security',
  shortDescription:
    'A feeling of safety, stability, and order is very important to you; this is true likely whether in society at large, at work, in your home, or in your relationships.',
};

export const SharedValues: React.FC = () => {
  const classes = styles();
  // const { push } = useHistory();

  // const { conversationId } = useAlignment();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Box textAlign="center">
          <PageTitle variant="h1">Your shared core values!</PageTitle>
          <PageTitle variant="h6">Top Shared Core Value</PageTitle>
        </Box>

        <Box textAlign="center" pb={4}>
          <Typography variant="body1">
            Understanding your shared core values will help you identify how to
            tackle climate topics and solutions with friends.
          </Typography>
        </Box>

        <ValueCard
          valueId={dummyTopValue.id}
          valueName={dummyTopValue.name}
          valueDescription={dummyTopValue.description}
          matchPercent={90}
        />

        <Box textAlign="center" pb={4}>
          <Typography variant="h4">
            How do your values align with Stevie’s?
          </Typography>
        </Box>
        <Box textAlign="center" pb={4}>
          <Typography variant="h4">Overall Similarity</Typography>
          <Typography variant="h3">70%</Typography>
        </Box>

        <FooterAppBar bgColor={COLORS.ACCENT10}>
          <Toolbar>
            <Button
              style={{ border: '1px solid #a347ff' }}
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => console.log('Handle Click')}
            >
              Next: Shared Impacts
            </Button>
          </Toolbar>
        </FooterAppBar>
      </div>
    </div>
  );
};
