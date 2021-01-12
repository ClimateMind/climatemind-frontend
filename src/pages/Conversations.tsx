import React from 'react';
import {
  Typography,
  Grid,
  Box,
  makeStyles,
  createStyles,
  SvgIcon,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/cm-logo.svg';
import Wrapper from '../components/Wrapper';
import { COLORS } from '../common/styles/CMTheme';
import BottomMenu from '../components/BottomMenu';
import SignUpForm from '../components/SignUpForm';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingBottom: 24,
    },
    iconContainer: {
      textAlign: 'center',
    },
    bigIcon: {
      color: COLORS.DK_TEXT,
      height: '75px',
      width: '75px',
      '& svg': {
        height: '50px',
      },
    },
  })
);

const ConversationsPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT3} fullHeight={true}>
        <Grid item sm={false} lg={4}>
          {/* left gutter */}
        </Grid>

        <Grid
          xs={12}
          sm={10}
          md={4}
          item
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          className={classes.root}
        >
          <Grid item>
            <Box my={-4}>
              <Grid container direction="row" alignItems="center" spacing={2}>
                <Grid item xs={3}>
                  <Logo width="76" data-testid="climate-mind-logo" />
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h4">Coming soon!</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid>
            <Box pb={5}>
              <Typography variant="h6" component="h6" align="center">
                Talking about climate change is the most effective way to take
                action.
              </Typography>
            </Box>
          </Grid>

          <Grid className={classes.iconContainer}>
            <ChatBubbleOutlineRoundedIcon className={classes.bigIcon} />
          </Grid>

          <Grid>
            <Box pt={3}>
              <Typography variant="body1" component="p" align="center">
                Want to be the first to use our revolutionary feature? Or just
                want to stay in the loop for important updates? Drop us your
                email below.
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <SignUpForm />
          </Grid>

          <Grid>
            <Typography variant="body1" component="p" align="center">
              Check out climatemind.org if you are interested in helping out.
              Any questions or feedback? Drop us an email at
              hello@climatemind.org
            </Typography>
          </Grid>
        </Grid>

        <Grid item sm={false} lg={4}>
          {/* right gutter */}
        </Grid>
      </Wrapper>
      <BottomMenu />
    </>
  );
};

export default ConversationsPage;
