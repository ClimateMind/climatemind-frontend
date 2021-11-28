import {
  Box,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { COLORS } from '../common/styles/CMTheme';
import FooterAppBar from '../components/FooterAppBar';
import PageTitle from '../components/PageTitle';
import { ValueCard } from '../components/ValueCard/ValueCard';
import Loader from '../components/Loader';
import { useCoreValues } from '../hooks/useCoreValues';
import ROUTES from '../components/Router/RouteConfig';

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

export const CoreValues: React.FC = () => {
  const classes = styles();
  const { push } = useHistory();
  const { personalValues } = useCoreValues();

  useEffect(() => {
    console.log({ personalValues });
  }, [personalValues]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {/* Centered Page Title */}

        <PageTitle variant="h1">Your top 3 core values!</PageTitle>

        {/* Top 3 Values Cards */}

        {!personalValues && <Loader />}

        {personalValues?.map((value, index) => (
          <div data-testid={`ValueCard-${index}`}>
            <ValueCard
              valueId={value.id}
              valueDescription={value.shortDescription}
              valueName={value.name}
              position={index + 1}
            />
          </div>
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
            {/* <Button
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
            </Button> */}

            <Button
              style={{ border: '1px solid #a347ff' }}
              variant="contained"
              color="primary"
              disableElevation
              onClick={() => push(ROUTES.USERB_SHARED_VALUES)}
            >
              Shared Values
            </Button>
          </Toolbar>
        </FooterAppBar>
      </div>
    </div>
  );
};
