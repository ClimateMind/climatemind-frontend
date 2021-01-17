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
import Button from '../Button';
import { useHistory } from 'react-router';
import ROUTES from '../Router/RouteConfig';
import { useSession } from '../../hooks/useSession';
import { useResponses } from '../../hooks/useResponses';
import { useClimatePersonality } from '../../hooks/useClimatePersonality';

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
      padding: theme.spacing(2),
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
  {
    text: "What's an Ontology",
    url:
      'https://docs.google.com/document/d/16Ot_5WPNOLUIrLkmusbMVnN827OEJKigrT2B8HP--Jk/edit#heading=h.3dxiw2n8d0ml',
  },
];

// Paper Top Menu Overlay which is actitivated by the hamburger menu on the app bar
const TopMenu: React.FC<MenuPaperProps> = ({ isShowing, setIsShowing }) => {
  const classes = useStyles();
  const { push } = useHistory();
  const { sessionId, clearSession } = useSession();
  const { dispatch } = useResponses();
  const { clearPersonality } = useClimatePersonality();

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
    //Clear personalValues
    clearPersonality();
    // Redirect back to Questionaire Start
    push(ROUTES.ROUTE_QUIZ);
  };

  return (
    <>
      <Slide direction="down" in={isShowing}>
        <Dialog
          fullScreen
          open={isShowing}
          onClose={handleClose}
          className={classes.menuPaper}
          keepMounted
          data-testid="TopMenuPaper"
        >
          <DialogContent>
            {/* Offset for app bar */}
            <div className={classes.offset} />

            <Grid item>
              {/* Menu List Items */}
              <List>
                {menuLinks.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    disableGutters={false}
                    onClick={() => handleNavAway(item.url)}
                  >
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
                {/* Privacy Policy */}
                <ListItem
                  button
                  disableGutters={false}
                  onClick={() => handleNav(ROUTES.ROUTE_PRIVACY)}
                >
                  <ListItemText primary="Privacy Policy" />
                </ListItem>

                {/* Personal Values option should only show if there is a session id */}
                {sessionId && (
                  <>
                    <ListItem
                      button
                      disableGutters={false}
                      onClick={() => handleNav(ROUTES.ROUTE_VALUES)}
                    >
                      <ListItemText primary="Personal Values" />
                    </ListItem>
                    <ListItem
                      button
                      disableGutters={false}
                      onClick={handleRetakeQuiz}
                    >
                      <ListItemText primary="Re-take the Quiz" />
                    </ListItem>
                  </>
                )}
              </List>
            </Grid>

            {/* Social Media Links*/}
            <Socials />

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
