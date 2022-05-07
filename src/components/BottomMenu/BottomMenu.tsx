import { Theme } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HomeIcon from '@material-ui/icons/Home';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { COLORS } from '../../common/styles/CMTheme';
import ROUTES from '../Router/RouteConfig';

interface BottomButton {
  label: string;
  value: string;
  index: number;
}

export interface BottomMenuProps {
  links?: BottomButton[];
}

export const bottomMenuLinks = [
  {
    label: 'Feed',
    value: '/climate-feed',
    index: 1,
  },
  {
    label: 'Actions',
    value: '/solutions',
    index: 2,
  },
  {
    label: 'Myths',
    value: '/myths',
    index: 3,
  },
  {
    label: 'Talk',
    value: '/conversations',
    index: 4,
  },
];

export const BottomMenu: React.FC<BottomMenuProps> = ({
  links = bottomMenuLinks,
}: BottomMenuProps) => {
  const [state, setState] = useState('/climate-feed');

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 9999,
      },
      actionItem: {
        // These styles are applied to the root element when
        // when selected. This changes the color of both the
        // icon and label text.
        '&$selected': {
          color: COLORS.DK_TEXT,
          borderTop: '2px solid',
        },
      },
      // NOTE: You need to include a `.selected` class in your
      // styles rules for the "&$selected" selector to work.
      selected: {},
    })
  );

  const iconStyle = { height: '20px' };

  //supported icons
  const getIcon = (type: string) => {
    switch (type) {
      case '/climate-feed':
        return <HomeIcon style={iconStyle} data-testid="BottomMenuIconsFeed" />;
      case '/myths':
        return (
          <AnnouncementIcon
            style={iconStyle}
            data-testid="BottomMenuIconsMyths"
          />
        );
      case '/solutions':
        return (
          <EmojiObjectsIcon
            style={iconStyle}
            data-testid="BottomMenuIconsSolutions"
          />
        );
      case '/saved':
        return (
          <BookmarksIcon style={iconStyle} data-testid="BottomMenuIconsSaved" />
        );
      case '/conversations':
        return (
          <QuestionAnswerIcon
            style={iconStyle}
            data-testid="BottomMenuIconsConversations"
          />
        );
      default:
        return null;
    }
  };

  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  // useNoSessionRedirect();

  const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
    setState(newValue);
    history.push(`${newValue}`);
  };

  useEffect(() => {
    if (pathname === ROUTES.PROFILE_MENU) {
      setState(ROUTES.PROFILE_MENU);
    }
  }, [pathname]);

  return (
    <div className={classes.root}>
      <BottomNavigation
        value={state}
        showLabels
        onChange={handleChange}
        className={classes.root}
        data-testid="BottomMenu"
      >
        {links.map((item) => (
          <BottomNavigationAction
            key={item.index}
            label={item.label}
            value={item.value}
            classes={{
              root: classes.actionItem,
              selected: classes.selected,
            }}
            icon={getIcon(item.value)}
            data-testid={`BottomMenuButton-${item.label}`}
          />
        ))}
      </BottomNavigation>
    </div>
  );
};
