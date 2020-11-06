import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import CloseIcon from '@material-ui/icons/Close';
import Div100vh from 'react-div-100vh';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaGithub,
} from 'react-icons/fa';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: 99,
      position: 'relative',
    },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(2),
      textAlign: 'center',
    },
    //Stuff for the Menu Paper
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

const usePaperStyles = makeStyles((theme: Theme) =>
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

const menuLinks = [
  { text: 'About ClimateMind', url: 'https://climatemind.org/' },
  { text: 'Scientists Speak Up', url: 'https://scientistsspeakup.org/' },
  { text: "What's an Ontology", url: 'https://www.google.com' },
];

interface TopMenuProps {
  isShowing: boolean;
}

const TopMenu: React.FC<TopMenuProps> = ({ isShowing }) => {
  const classes = usePaperStyles();

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook className={classes.faIcon} />,
      url: 'https://www.facebook.com/climatemindorg',
    },
    {
      name: 'Instagram',
      icon: <FaInstagram className={classes.faIcon} />,
      url: 'https://www.instagram.com/climatemind/',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className={classes.faIcon} />,
      url: 'https://www.google.com',
    },
    {
      name: 'Linkedin',
      icon: <FaLinkedin className={classes.faIcon} />,
      url: 'https://www.linkedin.com/company/climate-mind/',
    },
    {
      name: 'Youtube',
      icon: <FaYoutube className={classes.faIcon} />,
      url: 'https://www.youtube.com/channel/UCcU5SdPGMUj5FuwmKEjLu2Q',
    },
    {
      name: 'Github',
      icon: <FaGithub className={classes.faIcon} />,
      url: 'https://github.com/ClimateMind',
    },
  ];

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

          <Grid item className={classes.menuSocials}>
            <List>
              {socialLinks.map((social, index) => {
                return (
                  <IconButton
                    key={index}
                    onClick={() => handleOpen(social.url)}
                  >
                    {social.icon}
                  </IconButton>
                );
              })}
            </List>
          </Grid>
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

const CmAppBar: React.FC = () => {
  const classes = useStyles();

  const [isMenuShowing, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" color="default">
          <Toolbar variant="dense" disableGutters={true}>
            <Typography variant="h6" className={classes.title}>
              ClimateMind
            </Typography>

            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              aria-expanded={isMenuShowing}
              onClick={handleMenu}
            >
              {isMenuShowing ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
      <TopMenu isShowing={isMenuShowing} />
    </>
  );
};

export default CmAppBar;
