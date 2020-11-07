import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import { ReactComponent as FacebookIcon } from '../../assets/social/Facebook.svg';
import { ReactComponent as GithubIcon } from '../../assets/social/Github.svg';
import { ReactComponent as InstaIcon } from '../../assets/social/Instagram.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/social/Linkedin.svg';
import { ReactComponent as TwitterIcon } from '../../assets/social/Twitter.svg';
import { ReactComponent as YoutubeIcon } from '../../assets/social/Youtube.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuSocials: {
      marginTop: '23vh',
      maxWidth: '200px',
    },
    iconButton: {
      '& > *': {
        color: 'green',
      },
    },
    faIcon: {
      width: '38px',
      height: '38px',
      color: 'green',
      '& > *': {
        color: 'green',
      },
    },
  })
);

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
    <Grid item className={classes.menuSocials}>
      <List>
        {socialLinks.map((social, index) => {
          return (
            <>
              <IconButton
                className={classes.iconButton}
                key={index}
                onClick={() => handleOpen(social.url)}
              ></IconButton>

              {social.icon}
            </>
          );
        })}
      </List>
    </Grid>
  );
};

export default Socials;
