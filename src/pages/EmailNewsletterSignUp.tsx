import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { COLORS } from '../common/styles/CMTheme';
import EmailNewsLetterSignUpForm from '../components/EmailSubscribeForm';
import PageContent from '../components/PageContent';
import PageTitle from '../components/PageTitle';
import Wrapper from '../components/Wrapper';

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
      marginBottom: '20px',
      '& a, & a:visited, & a:active,': {
        color: COLORS.DK_TEXT,
        textDecoration: 'underline',
      },
      '& :first-child': {
        marginBottom: '1em',
      },
    },
    bullet: {
      '&::before': {
        content: '"• "',
      },
    },
  })
);

export const EmailNewsletterSignUpPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Wrapper bgColor={COLORS.ACCENT3} fullHeight={true}>
        <PageContent>
          <Box>
            <Grid item>
              <PageTitle>Coming Soon</PageTitle>
            </Grid>
          </Box>

          <Box my={2}>
            <Typography variant="h6" component="h6" align="center">
              Talking about climate change is the most effective way to take
              action.
            </Typography>
          </Box>

          <Box my={4}>
            <Typography variant="body1" component="h6" align="center">
              Want to be the first to use our revolutionary feature? Or just
              want to stay in the loop for important updates? Drop us your email
              below.
            </Typography>
          </Box>

          <Box my={2}>
            <EmailNewsLetterSignUpForm />
          </Box>

          <Box my={2}>
            <Typography variant="body1" component="h6" align="center">
              Check out climatemind.org if you are interested in helping out.
              Any questions or feedback? Drop us an email at {''}
              <a
                className={classes.links}
                href="mailto:hello@climatemind.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                hello@climatemind.org
              </a>
            </Typography>
          </Box>
        </PageContent>
      </Wrapper>
    </>
  );
};
