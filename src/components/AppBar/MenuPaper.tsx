import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Dialog, DialogContent } from '@material-ui/core';
import Socials from './Socials';
import { Button } from '../Button';
import MenuLoginLogout from './MenuLoginLogout';
import { useHistory } from 'react-router';
import ROUTES from '../Router/RouteConfig';
import { useSession } from '../../hooks/useSession';
import { useResponses } from '../../hooks/useResponses';
import { useQuestions } from '../../hooks/useQuestions';
import { useAuth } from '../../hooks/auth/useAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuPaper: {
      padding: '0',
      width: '100vw',
      top: 0,
      left: 0,
      height: '100%',
    },
    menuEmail: {
      marginTop: '1em',
    },
    offset: theme.mixins.toolbar,
  })
);

interface MenuPaperProps {
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuLinks = [
  { text: 'About ClimateMind', url: 'https://climatemind.org/' },
  { text: 'Scientists Speak Up', url: 'https://scientistsspeakup.org/' },
];

// Paper Top Menu Overlay which is actitivated by the hamburger menu on the app bar
const TopMenu: React.FC<MenuPaperProps> = ({ isShowing, setIsShowing }) => {
  const classes = useStyles();
  const { push } = useHistory();
  const { quizId, clearSession } = useSession();
  const { dispatch } = useResponses();
  const { setCurrentSet } = useQuestions();
  const { auth } = useAuth();
  const { isLoggedIn } = auth;

  // Handles opening the link in a new window
  const handleNavAway = (url: string) => {
    window.open(url);
    setIsShowing(false);
  };

  const handleNav = (url: string) => {
    push(url);
    setIsShowing(false);
  };

  const handleClose = () => {
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
    push(ROUTES.ROUTE_QUIZ);
  };

  return (
    <>
      <Slide direction="down" in={isShowing}>
        <Dialog
          fullScreen
          aria-labelledby="MenuSpacer"
          open={isShowing}
          onClose={handleClose}
          className={classes.menuPaper}
          keepMounted
          style={{ zIndex: 10000 }}
          data-testid="TopMenuPaper"
          TransitionProps={{ role: 'presentation' } as any} // This is required to for MUI to give the dialog only one role, removing cause the cypress accessability check to fail.
        >
          <DialogContent>
            {/* Offset for app bar */}
            <div
              id="MenuSpacer"
              className={classes.offset}
              aria-label="Climate Mind Top Menu"
              role="navigation"
            />

            <Grid item>
              <List>
                {/* Personal Values option should only show if there is a session id */}
                {quizId && (
                  <>
                    <ListItem
                      component="li"
                      disableGutters={true}
                      onClick={() => handleNav(ROUTES.ROUTE_VALUES)}
                    >
                      <ListItemText primary="Personal Values" />
                    </ListItem>
                    <ListItem
                      component="li"
                      disableGutters={true}
                      onClick={handleRetakeQuiz}
                    >
                      <ListItemText primary="Re-take the Quiz" />
                    </ListItem>
                    <ListItem
                      component="li"
                      disableGutters={true}
                      onClick={() => handleNav(ROUTES.ROUTE_CONVERSATIONS)}
                    >
                      <ListItemText primary="My Dashboard" />
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
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
                {/* Privacy Policy */}
                <ListItem
                  component="li"
                  disableGutters={true}
                  onClick={() => handleNav(ROUTES.ROUTE_PRIVACY)}
                >
                  <ListItemText primary="Privacy Policy" />
                </ListItem>
              </List>
            </Grid>

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
                Email Us
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
      </Slide>
    </>
  );
};

export default TopMenu;
