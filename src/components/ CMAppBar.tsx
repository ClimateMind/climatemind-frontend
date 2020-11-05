import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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
    menuPaper: {
      padding: theme.spacing(1),
      position: 'absolute',
      zIndex: 50,
      top: 0,
      left: 0,
    },
    menuGrid: {
      height: '100%',
    },
    faIcon: {
      width: '44px',
      height: '44px',
      color: theme.palette.secondary.main,
    },
  })
);

const menuLinks = [
  { text: 'About ClimateMind', url: 'https://climatemind.org/' },
  { text: 'Scientists Speak Up', url: 'https://scientistsspeakup.org/' },
  { text: "What's an Ontology", url: 'https://www.google.com' },
  { text: 'About ClimateMind', url: 'https://www.google.com' },
];

const TopMenu = () => {
  const classes = useStyles();

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

  return (
    <Paper className={classes.menuPaper} elevation={3}>
      <Div100vh>
        <Grid item>
          <List>
            {menuLinks.map((item, index) => (
              <ListItem button key={item.text}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item>
          <List>
            {socialLinks.map((social) => {
              return <IconButton>{social.icon}</IconButton>;
            })}
          </List>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MailIcon />}
            disableElevation
          >
            Email Us
          </Button>
        </Grid>
      </Div100vh>
    </Paper>
  );
};

const CmAppBar = () => {
  const classes = useStyles();

  const [isMenuShowing, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="sticky" color="default">
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

      {isMenuShowing && <TopMenu />}
    </>
  );
};

export default CmAppBar;
