import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Div100vh from 'react-div-100vh';
import Slide from '@material-ui/core/Slide';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Socials from './Socials';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuPaper: {
      padding: '0',
      width: '100vw',
      position: 'fixed',
      zIndex: 90,
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
const TopMenu: React.FC<MenuPaperProps> = ({ isShowing }) => {
  const classes = useStyles();

  // Handles opening the link in a new window
  const handleOpen = (url: string) => {
    window.open(url);
  };

  return (
    <Slide direction="down" in={isShowing} mountOnEnter unmountOnExit>
      <Paper
        className={classes.menuPaper}
        elevation={3}
        data-testid="TopMenuPaper"
      >
        <Div100vh>
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
                  onClick={() => handleOpen(item.url)}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
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
              onClick={() => handleOpen('mailto:hello@climatemind.org')}
            >
              Email Us
            </Button>
          </Grid>
        </Div100vh>
      </Paper>
    </Slide>
  );
};

export default TopMenu;
