import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { List, ListItem } from '@material-ui/core';

import { ReactComponent as FacebookIcon } from '../../assets/socials/Facebook.svg';
import { ReactComponent as TwitterIcon } from '../../assets/socials/Twitter.svg';
import { ReactComponent as GithubIcon } from '../../assets/socials/Github.svg';
import { ReactComponent as InstaIcon } from '../../assets/socials/Instagram.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/socials/Linkedin.svg';
// import { ReactComponent as YoutubeIcon } from '../../assets/socials/Youtube.svg';
import { ReactComponent as TelegramIcon } from '../../assets/socials/Telegram.svg';

const useStyles = makeStyles(() =>
  createStyles({
    menuSocials: {
      marginTop: '8vh',
      marginLeft: -12,
      maxWidth: '220px',
    },
    faIcon: {
      height: '44px',
      width: '44px',
      color: '#39f5ad',
    },
    li: {
      display: 'inline',
      margin: 0,
      padding: 0,
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
      url: 'https://twitter.com/Climate_Mind',
    },
    {
      name: 'Linkedin',
      icon: <LinkedinIcon className={classes.faIcon} />,
      url: 'https://www.linkedin.com/company/climate-mind/',
    },
    // {
    //   name: 'Youtube',
    //   icon: <YoutubeIcon className={classes.faIcon} />,
    //   url: 'https://www.youtube.com/channel/UCcU5SdPGMUj5FuwmKEjLu2Q',
    // },
    {
      name: 'Github',
      icon: <GithubIcon className={classes.faIcon} />,
      url: 'https://github.com/ClimateMind',
    },
    {
      name: 'Telegram',
      icon: <TelegramIcon className={classes.faIcon} />,
      url: 'https://t.me/climatemind_chat',
    },
  ];

  return (
    <Grid item className={classes.menuSocials} data-testid="socials">
      <List>
        {socialLinks.map((social, index) => {
          return (
            <ListItem
              component="li"
              className={classes.li}
              key={`social-icon-${index}`}
            >
              <IconButton
                aria-label={social.name}
                key={index}
                onClick={() => handleOpen(social.url)}
              >
                {social.icon}
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  );
};

export default Socials;
