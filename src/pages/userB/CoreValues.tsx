import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { COLORS } from '../../common/styles/CMTheme';
import { FooterAppBar } from '../../components/FooterAppBar/FooterAppBar';
import Loader from '../../components/Loader';
import PageTitle from '../../components/PageTitle';
import ROUTES from '../../components/Router/RouteConfig';
import { ValueCard } from '../../components/ValueCard';
import { useAlignment } from '../../hooks/useAlignment';
import { useCoreValues } from '../../hooks/useCoreValues';
import { usePostAlignment } from '../../hooks/usePostAlignment';
import useRetakeQuiz from '../../hooks/useRetakeQuiz';
import { useSession } from '../../hooks/useSession';

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
  const { retakeQuiz } = useRetakeQuiz();
  const { conversationId, alignmentId } = useAlignment();
  const { quizId } = useSession();
  const { submitAlignment } = usePostAlignment();

  // POST the aligment if NOT already posted(alignmentId) AND we have conversationId AND quiz submitted (quizId)
  useEffect(() => {
    if (!alignmentId && conversationId && quizId) {
      submitAlignment({ conversationId, quizId });
    }
  }, [conversationId, quizId, submitAlignment, alignmentId]);

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
          <Typography variant="body2">
            Keep going to see how your core values match with your friend and
            understand how they can impact your thoughts and actions on climate
            change.
          </Typography>
        </Box>

        <FooterAppBar bgColor={COLORS.ACCENT10}>
          <Button
            style={{
              color: '#07373B',
              border: '#07373B 1px solid',
              // margin: '0 11px 0 -11px',
            }}
            variant="outlined"
            color="primary"
            disableElevation
            onClick={() => retakeQuiz()}
          >
            Retake Quiz
          </Button>

          <Button
            style={{ border: '1px solid #a347ff' }}
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => push(ROUTES.USERB_SHARED_VALUES)}
          >
            NEXT: Shared Values
          </Button>
        </FooterAppBar>
      </div>
    </div>
  );
};
