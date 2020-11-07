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
    root: {
      height: 180,
    },
    container: {
      display: 'flex',
    },
    menuPaper: {
      padding: '0',
      width: '100vw',
      position: 'fixed',
      zIndex: 90,
      top: 0,
      left: 0,
    },
    menuGrid: {
      height: '100%',
    },
    menuSocials: {
      marginTop: '23vh',
    },
    menuEmail: {
      padding: theme.spacing(2),
      marginTop: '12vh',
    },
    faIcon: {
      width: '38px',
      height: '38px',
      color: theme.palette.secondary.main,
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
  { text: "What's an Ontology", url: 'https://www.google.com' },
];

const TopMenu: React.FC<MenuPaperProps> = ({ isShowing }) => {
  const classes = useStyles();

  const handleOpen = (url: string) => {
    window.open(url);
  };

  return (
    <Slide direction="down" in={isShowing} mountOnEnter unmountOnExit>
      <Paper className={classes.menuPaper} elevation={3}>
        <Div100vh>
          <div className={classes.offset} />
          <Grid item>
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

          <Socials />

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
