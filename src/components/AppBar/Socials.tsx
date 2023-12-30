import React from 'react';
import { Grid, IconButton, List, ListItem } from '@mui/material';

import { ReactComponent as FacebookIcon } from '../../assets/socials/Facebook.svg';
import { ReactComponent as TwitterIcon } from '../../assets/socials/Twitter.svg';
import { ReactComponent as GithubIcon } from '../../assets/socials/Github.svg';
import { ReactComponent as InstaIcon } from '../../assets/socials/Instagram.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/socials/Linkedin.svg';
// import { ReactComponent as YoutubeIcon } from '../../assets/socials/Youtube.svg';
import { ReactComponent as TelegramIcon } from '../../assets/socials/Telegram.svg';

// Returns a 2x3 Grid of Social Media Links
const Socials: React.FC = () => {
  const handleOpen = (url: string) => {
    window.open(url);
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FacebookIcon style={styles.faIcon} />,
      url: 'https://www.facebook.com/climatemindorg',
    },
    {
      name: 'Instagram',
      icon: <InstaIcon style={styles.faIcon} />,
      url: 'https://www.instagram.com/climatemind/',
    },
    {
      name: 'Twitter',
      icon: <TwitterIcon style={styles.faIcon} />,
      url: 'https://twitter.com/Climate_Mind',
    },
    {
      name: 'Linkedin',
      icon: <LinkedinIcon style={styles.faIcon} />,
      url: 'https://www.linkedin.com/company/climate-mind/',
    },
    // {
    //   name: 'Youtube',
    //   icon: <YoutubeIcon style={styles.faIcon} />,
    //   url: 'https://www.youtube.com/channel/UCcU5SdPGMUj5FuwmKEjLu2Q',
    // },
    {
      name: 'Github',
      icon: <GithubIcon style={styles.faIcon} />,
      url: 'https://github.com/ClimateMind',
    },
    {
      name: 'Telegram',
      icon: <TelegramIcon style={styles.faIcon} />,
      url: 'https://t.me/climatemind_chat',
    },
  ];

  return (
    <Grid item style={styles.menuSocials} data-testid="socials">
      <List>
        {socialLinks.map((social, index) => {
          return (
            <ListItem
              component="li"
              style={styles.li}
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

const styles: { [key: string]: React.CSSProperties } = {
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
};

export default Socials;
