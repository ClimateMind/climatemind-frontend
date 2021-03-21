import React from 'react';
import {
  Typography,
  Grid,
  Box,
  makeStyles,
  createStyles,
  Link,
} from '@material-ui/core';
import Wrapper from '../components/Wrapper';
import { COLORS } from '../common/styles/CMTheme';
import EmailSignUpForm from '../components/EmailSubscribeForm';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PageContentFlex from '../components/PageContentFlex';
import PageTitle from '../components/PageTitle';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    iconContainer: {
      textAlign: 'center',
    },
    bigIcon: {
      color: COLORS.DK_TEXT,
      height: '100px',
      marginRight: '15px',
      width: '55px',
      '& svg': {
        height: '50px',
      },
    },
    links: {
      '& a': {
        color: COLORS.DK_TEXT,
        textDecoration: 'underline',
      },
      '& :first-child': {
        marginBottom: '1em',
      },
    },
  })
);

const ConversationsPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT3} fullHeight={true}>
        <PageContentFlex hasBottomMenu>
          <Box>
            <Grid container direction="row" alignItems="center" spacing={0}>
              <Grid item>
                <QuestionAnswerIcon className={classes.bigIcon} />
              </Grid>
              <Grid item>
                <PageTitle>Coming soon!</PageTitle>
              </Grid>
            </Grid>
          </Box>
          <Box mt={-6}>
            <Typography variant="h6" component="h6" align="center">
              Talking about climate change is the most effective way to take
              action.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" component="p" align="center">
              Want to be the first to use our revolutionary feature? Or just
              want to stay in the loop for important updates? Drop us your email
              below.
            </Typography>
          </Box>
          <EmailSignUpForm />
          <Box className={classes.links}>
            <Typography variant="body1" component="p" align="center">
              Check out{' '}
              <Link href="http://www.climatemind.org">climatemind.org</Link> if
              you are interested in helping out.
            </Typography>

            <Typography variant="body1" component="p" align="center">
              Any questions or feedback? Drop us an email at{' '}
              <Link href="mailto:hello@climatemind.org">
                hello@climatemind.org
              </Link>
            </Typography>
          </Box>
        </PageContentFlex>
      </Wrapper>
    </>
  );
};

export default ConversationsPage;
