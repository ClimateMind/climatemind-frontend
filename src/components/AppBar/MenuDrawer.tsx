import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Drawer, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';

import { useSession } from '../../hooks/useSession';
import MenuLoginLogout from './MenuLoginLogout';
import ROUTES from '../Router/RouteConfig';
import Socials from './Socials';
import { useAuth } from '../../hooks/auth/useAuth';
import { useQuestions } from '../../hooks/useQuestions';
import { useResponses } from '../../hooks/useResponses';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuDrawer: {
      width: 360,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 360,
      paddingTop: theme.spacing(7),
      paddingLeft: theme.spacing(2),
    },
    drawerContainer: {
      height: 'calc(100vh - 80px)',
    },
    drawerListItem: {
      cursor: 'pointer',
      paddingLeft: theme.spacing(2),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    // MuiListItem-root
    menuEmail: {
      marginTop: '1em',
    },
  })
);

export interface MenuDrawerProps {
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuLinks = [
  { text: 'About ClimateMind', url: 'https://climatemind.org/' },
  { text: 'Community & Chat', url: 'https://t.me/climatemind_chat' },
];

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isShowing, setIsShowing }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { quizId, clearSession } = useSession();
  const { setCurrentSet } = useQuestions();
  const { dispatch } = useResponses();
  const { auth } = useAuth();
  const { isLoggedIn } = auth;

  // Handles opening the link in a new window
  const handleNavAway = (url: string) => {
    window.open(url);
  };

  const handleNav = (url: string) => {
    navigate(url);
    setIsShowing(false);
  };

  const handleRetakeQuiz = () => {
    // Clear the session id
    clearSession();
    // Clear the questionnaire responses
    dispatch({ type: 'CLEAR_RESPONSES' });

    // reset questions to set #1
    if (setCurrentSet) {
      setCurrentSet(1);
    }
    navigate(ROUTES.QUIZ_PAGE);
  };

  return (
    <>
      <Drawer
        anchor={'right'}
        open={isShowing}
        className={classes.menuDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        data-testid="TopMenuDrawer"
      >
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          className={classes.drawerContainer}
        >
          {/* Grid item -> float to top */}
          <Grid item>
            <List>
              {/* Personal Values option should only show if there is a session id */}
              {quizId && (
                <>
                  <ListItem
                    component="li"
                    disableGutters={true}
                    className={classes.drawerListItem}
                    onClick={() => handleNav(ROUTES.PERSONAL_VALUES_PAGE)}
                  >
                    <ListItemText primary="Personal Values" />
                  </ListItem>
                  <ListItem
                    component="li"
                    disableGutters={true}
                    className={classes.drawerListItem}
                    onClick={handleRetakeQuiz}
                  >
                    <ListItemText primary="Re-take the Quiz" />
                  </ListItem>
                  <ListItem
                    component="li"
                    disableGutters={true}
                    className={classes.drawerListItem}
                    onClick={() => handleNav(ROUTES.CONVERSATIONS_INTRO_PAGE)}
                  >
                    <ListItemText primary="Conversations" />
                  </ListItem>
                </>
              )}

              {/* Menu List Items  */}
              {menuLinks.map((item, index) => (
                <ListItem
                  component="li"
                  key={index}
                  disableGutters={true}
                  onClick={() => handleNavAway(item.url)}
                  className={classes.drawerListItem}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
              {/* Privacy Policy */}
              <ListItem
                component="li"
                disableGutters={true}
                className={classes.drawerListItem}
                onClick={() => handleNav(ROUTES.PRIVACY_PAGE)}
              >
                <ListItemText primary="Privacy Policy" />
              </ListItem>
            </List>
          </Grid>

          {/* Grid item -> float to bottom */}
          <Grid item>
            {/* Social Media Links*/}
            <Socials />

            {/* Login / Logout Buttons */}
            <Grid item className={classes.menuEmail}>
              <MenuLoginLogout
                isLoggedIn={isLoggedIn}
                setMenuIsShowing={setIsShowing}
              />
            </Grid>

            {/* Email Us Button */}
            <Grid item className={classes.menuEmail}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<MailIcon />}
                disableElevation
                onClick={() => handleNavAway('mailto:hello@climatemind.org')}
              >
                Feedback
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export default MenuDrawer;
