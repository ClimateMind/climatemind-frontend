import {
  Box,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React from 'react';
// import { useHistory } from 'react-router-dom';
import { COLORS } from '../common/styles/CMTheme';
import FooterAppBar from '../components/FooterAppBar';
import PageTitle from '../components/PageTitle';
import { ValueCard } from '../components/ValueCard';
// import { useAlignment } from '../hooks/useAlignment';

const styles = makeStyles(() => {
  return {
    root: {
      minHeight: '100vh',
      backgroundColor: COLORS.ACCENT9,
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
    headline: {
      width: '87.5%',
      border: '1px solid red',
    },
  };
});

// TODO: Add the real values
const dummyValues = [
  {
    description:
      'The sense of security that comes with feeling like you belong highly motivates you. Comfort for you is knowing the people and things you cherish are taken care of.',
    id: 'security',
    name: 'security',
    shortDescription:
      'A feeling of safety, stability, and order is very important to you; this is true likely whether in society at large, at work, in your home, or in your relationships.',
  },
  {
    description:
      'The idea of upsetting others or disrupting the status quo likely fills you with dread, so you work hard to bring self-discipline, responsibility and politeness to the table.',
    id: 'conformity',
    name: 'conformity',
    shortDescription:
      'Rule breaker? Far from it. In fact, you love nothing more than sticking by the rules and conforming to social norms.',
  },
  {
    description:
      'Being reliable and devoted to the needs of those around you gives you great satisfaction; you likely do a great deal to keep your close relationships thriving.',
    id: 'benevolence',
    name: 'benevolence',
    shortDescription:
      'Forgiving, helping, and being loyal are important to you. You likely look to preserve and improve the lives of those that share your core interests or identities.',
  },
];

export const CoreValues: React.FC = () => {
  const classes = styles();
  // const { push } = useHistory();

  // const { conversationId } = useAlignment();

  const handleUserBTakesQuiz = () => {
    console.log('handleUserBTakesQuiz');
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {/* Centered Page Title */}

        <PageTitle variant="h1">Your top 3 core values!</PageTitle>

        {/* Top 3 Values Cards */}
        {dummyValues.map((value, index) => (
          <ValueCard
            valueDescription={value.shortDescription}
            valueName={value.name}
            position={index + 1}
          />
        ))}

        <Box textAlign="center" my={5}>
          <Typography variant="body1">
            Keep going to see how your core values match with your friend and
            understand how they can impact your thoughts and actions on climate
            change.
          </Typography>
        </Box>

        <FooterAppBar bgColor={COLORS.ACCENT10}>
          <Toolbar>
            <Button
              style={{
                color: '#07373B',
                border: '#07373B 1px solid',
                // margin: '0 11px 0 -11px',
              }}
              variant="outlined"
              color="primary"
              disableElevation
              onClick={handleUserBTakesQuiz}
            >
              Retake Quiz
            </Button>

            <Button
              style={{ border: '1px solid #a347ff' }}
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleUserBTakesQuiz}
            >
              Shared Values
            </Button>
          </Toolbar>
        </FooterAppBar>
      </div>
    </div>
  );
};
