import React from 'react';
import { useNavigate } from 'react-router';

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  Slide,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

import Socials from './Socials';
import MenuLoginLogout from './MenuLoginLogout';
import ROUTES from '../../router/RouteConfig';
import { useSession } from '../../hooks/useSession';
import { useResponses } from '../../hooks/useResponses';
import { useQuestions } from '../../hooks/useQuestions';
import { useAuth } from '../../hooks/auth/useAuth';
import { CmButton } from 'shared/components';

interface MenuPaperProps {
  isShowing: boolean;
  setIsShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const menuLinks = [
  { text: 'About ClimateMind', url: 'https://climatemind.org/' },
  { text: 'Community & Chat', url: 'https://t.me/climatemind_chat' },
];

// Paper Top Menu Overlay which is actitivated by the hamburger menu on the app bar
const TopMenu: React.FC<MenuPaperProps> = ({ isShowing, setIsShowing }) => {
  const navigate = useNavigate();
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
    navigate(url);
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
    navigate(ROUTES.QUIZ_PAGE);
  };

  return (
    <>
      <Slide direction="down" in={isShowing}>
        <Dialog
          fullScreen
          aria-labelledby="MenuSpacer"
          open={isShowing}
          onClose={handleClose}
          style={{
            padding: '0',
            width: '100vw',
            top: 0,
            left: 0,
            height: '100%',
            zIndex: 10000 ,
          }}
          keepMounted
          data-testid="TopMenuPaper"
          TransitionProps={{ role: 'presentation' } as any} // This is required to for MUI to give the dialog only one role, removing cause the cypress accessability check to fail.
        >
          <DialogContent>
            {/* Offset for app bar */}
            <div
              id="MenuSpacer"
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
                      onClick={() => handleNav(ROUTES.PERSONAL_VALUES_PAGE)}
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
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
                {/* Privacy Policy */}
                <ListItem
                  component="li"
                  disableGutters={true}
                  onClick={() => handleNav(ROUTES.PRIVACY_PAGE)}
                >
                  <ListItemText primary="Privacy Policy" />
                </ListItem>
              </List>
            </Grid>

            {/* Social Media Links*/}
            <Socials />

            {/* Login / Logout Buttons */}
            <Grid
              item
              style={{
                marginTop: '1em',
              }}
            >
              <MenuLoginLogout
                isLoggedIn={isLoggedIn}
                setMenuIsShowing={setIsShowing}
              />
            </Grid>

            {/* Email Us Button */}
            <Grid
              item
              style={{
                marginTop: '1em',
              }}
            >
              <CmButton
                text="Feedback"
                onClick={() => handleNavAway('mailto:hello@climatemind.org')}
                startIcon={<MailIcon />}
              />
            </Grid>
          </DialogContent>
        </Dialog>
      </Slide>
    </>
  );
};

export default TopMenu;
