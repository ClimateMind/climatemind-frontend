import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import { FaFacebookF as FacebookIcon } from 'react-icons/fa';
import { FaTwitter as TwitterIcon } from 'react-icons/fa';
import { FaGithub as GithubIcon } from 'react-icons/fa';
import { FaGithub as InstaIcon } from 'react-icons/fa';
import { FaLinkedin as LinkedinIcon } from 'react-icons/fa';
import { FaYoutube as YoutubeIcon } from 'react-icons/fa';

const useStyles = makeStyles(() =>
  createStyles({
    menuSocials: {
      marginTop: '23vh',
      maxWidth: '220px',
    },
    faIcon: {
      height: '44px',
      width: '44px',
      color: '#39f5ad',
    },
  })
);

// Returns a 2x3 Grid of Social Media Links
const Socials: React.FC = () => {
  const classes = useStyles();

  const handleOpen = (url: string) => {
    window.open(url);
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FacebookIcon className={classes.faIcon} />,
      url: 'https://www.facebook.com/climatemindorg',
    },
    {
      name: 'Instagram',
      icon: <InstaIcon className={classes.faIcon} />,
      url: 'https://www.instagram.com/climatemind/',
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon className={classes.faIcon} />,
      url: 'https://www.google.com',
    },
    {
      name: 'Linkedin',
      icon: <LinkedinIcon className={classes.faIcon} />,
      url: 'https://www.linkedin.com/company/climate-mind/',
    },
    {
      name: 'Youtube',
      icon: <YoutubeIcon className={classes.faIcon} />,
      url: 'https://www.youtube.com/channel/UCcU5SdPGMUj5FuwmKEjLu2Q',
    },
    {
      name: 'Github',
      icon: <GithubIcon className={classes.faIcon} />,
      url: 'https://github.com/ClimateMind',
    },
  ];

  return (
    <Grid item className={classes.menuSocials} data-testid="socials">
      <List>
        {socialLinks.map((social, index) => {
          return (
            <IconButton
              aria-label={social.name}
              key={index}
              onClick={() => handleOpen(social.url)}
            >
              {social.icon}
            </IconButton>
          );
        })}
      </List>
    </Grid>
  );
};

export default Socials;
