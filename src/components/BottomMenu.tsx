import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HomeIcon from '@material-ui/icons/Home';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

import { COLORS } from '../common/styles/CMTheme';
import { useHistory, useLocation } from 'react-router-dom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { useNoSessionRedirect } from '../hooks/useNoSessionRedirect';

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
    label: 'Solutions',
    value: '/solutions',
    index: 2,
  },
  {
    label: 'Myths',
    value: '/myths',
    index: 3,
  },
  {
    label: 'Conversations',
    value: '/conversations',
    index: 4,
  },
];

const BottomMenu: React.FC<BottomMenuProps> = ({
  links = bottomMenuLinks,
}: BottomMenuProps) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 1400,
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

  //supported icons
  const getIcon = (type: string) => {
    switch (type) {
      case '/climate-feed':
        return <HomeIcon data-testid="BottomMenuIconsFeed" />;
      case '/myths':
        return <AnnouncementIcon data-testid="BottomMenuIconsMyths" />;
      case '/solutions':
        return <EmojiObjectsIcon data-testid="BottomMenuIconsSolutions" />;
      case '/saved':
        return <BookmarksIcon data-testid="BottomMenuIconsSaved" />;
      case '/conversations':
        return (
          <QuestionAnswerIcon data-testid="BottomMenuIconsConversations" />
        );
      default:
        return null;
    }
  };

  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  useNoSessionRedirect();

  const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
    history.push(`${newValue}`);
  };

  return (
    <div className={classes.root} data-testid="BottomMenu">
      <BottomNavigation
        value={pathname}
        onChange={handleChange}
        showLabels
        className={classes.root}
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
            data-testid="BottomMenuButton"
          />
        ))}
      </BottomNavigation>
    </div>
  );
};

export default BottomMenu;
