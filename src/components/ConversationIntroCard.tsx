import {
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  createStyles,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    introCard: {
      textAlign: 'center',
      margin: '0 11px 2em',
    },
  })
);

const ConversationIntroCard: React.FC = () => {
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = useState(true);
  const handleToggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <Card className={classes.introCard}>
      <CardContent>
        <Typography
          variant="h4"
          style={{ letterSpacing: '0em', fontWeight: 'bolder' }}
        >
          How to talk about <br />
          Climate Change
        </Typography>
        {isExpanded ? (
          <div>
            {/* Step 1 */}
            <Box style={{ marginTop: '2.4em', marginBottom: '0.8em' }}>
              <Typography
                variant="h5"
                style={{ letterSpacing: '0em', fontWeight: 'bolder' }}
              >
                Step 1: Bond
              </Typography>
            </Box>
            <Typography style={{ fontWeight: 'normal', lineHeight: '1.1em' }}>
              Start your conversation by bonding over similar personal values
              and interests.
              <br />
              <br />
              Climate Mind helps with this by giving you a special link to the
              values questionnaire to share with others before you chat.
            </Typography>

            {/* Step 2 */}
            <Box style={{ marginTop: '2.4em', marginBottom: '0.8em' }}>
              <Typography
                variant="h5"
                style={{ letterSpacing: '0em', fontWeight: 'bolder' }}
              >
                Step 2: Relate
              </Typography>
            </Box>
            <Typography style={{ fontWeight: 'normal', lineHeight: '1.1em' }}>
              Connect the dots for others on how your shared values relate to
              climate change.
            </Typography>

            {/* Step 3 */}
            <Box style={{ marginTop: '2.4em', marginBottom: '0.8em' }}>
              <Typography
                variant="h5"
                style={{ letterSpacing: '0em', fontWeight: 'bolder' }}
              >
                Step 3: Inspire
              </Typography>
            </Box>
            <Typography style={{ fontWeight: 'normal', lineHeight: '1.1em' }}>
              Motivate the other person with solutions they find attractive.
            </Typography>
          </div>
        ) : (
          <div></div>
        )}

        {/* Collapse Button */}
        <Grid
          container
          direction="row"
          justifyContent={'flex-end'}
          alignItems="center"
        >
          <Box>
            <Button
              style={{ marginTop: '10px' }}
              onClick={handleToggleExpanded}
            >
              {isExpanded ? 'LESS' : 'MORE'}
            </Button>
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ConversationIntroCard;
