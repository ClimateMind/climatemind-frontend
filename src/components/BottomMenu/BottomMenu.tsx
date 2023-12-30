import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import ROUTES from '../../router/RouteConfig';
import { useSession } from '../../hooks/useSession';
import { TalkMenuButtonEvent, analyticsService } from 'services';

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
    label: 'Home',
    value: '/climate-feed',
    index: 1,
  },
  {
    label: 'Actions',
    value: '/solutions',
    index: 2,
  },
  {
    label: 'Talk',
    value: '/conversations',
    index: 3,
  },
  {
    label: 'Myths',
    value: '/myths',
    index: 4,
  },
];

export const BottomMenu: React.FC<BottomMenuProps> = ({
  links = bottomMenuLinks,
}: BottomMenuProps) => {
  const [state, setState] = useState('/climate-feed');
  const { sessionId, hasAcceptedCookies } = useSession();

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

  const navigate = useNavigate();
  const { pathname } = useLocation();
  // useNoSessionRedirect();

  const handleChange = (_: any, newValue: React.SetStateAction<string>) => {
    if (sessionId && hasAcceptedCookies && newValue === '/conversations') {
      analyticsService.postEvent(TalkMenuButtonEvent);
    }

    setState(newValue);
    navigate(`${newValue}`);
  };

  useEffect(() => {
    if (pathname === ROUTES.PROFILE_PAGE) {
      setState(ROUTES.PROFILE_PAGE);
    }
  }, [pathname]);

  return (
    <div style={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 9999,
      }}>
      <BottomNavigation
        value={state}
        showLabels
        onChange={handleChange}
        style={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 9999,
      }}
        data-testid="BottomMenu"
      >
        {links.map((item) => (
          <BottomNavigationAction
            key={item.index}
            label={item.label}
            value={item.value}
            icon={getIcon(item.value)}
            data-testid={`BottomMenuButton-${item.label}`}
          />
        ))}
      </BottomNavigation>
    </div>
  );
};
