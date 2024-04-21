import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { Home, EmojiObjects, QuestionAnswer, Announcement } from '@mui/icons-material';

import ROUTES from 'router/RouteConfig';
import CmBottomTabs from './CmBottomTabs';
import CmBottomTab from './CmBottomTab';
import { useAppSelector } from 'store/hooks';

const tabRoutes = [
  ROUTES.CLIMATE_FEED_PAGE,
  ROUTES.SOLUTIONS_FEED_PAGE,
  ROUTES.CONVERSATIONS_INTRO_PAGE,
  ROUTES.MYTHS_FEED_PAGE,
];

const conversationRoutes = [
  ROUTES.CONVERSATIONS_INTRO_PAGE,
  ROUTES.CONVERSATIONS_PAGE,
  ROUTES.SHARED_VALUES_PAGE,
  ROUTES.USERA_SHARED_FEED_PAGE,
]

function CmBottomTabsNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useAppSelector(state => state.auth.userA);
  const isSmall = useMediaQuery('(max-width: 960px)');

  const [selectedTab, setSelectedTab] = useState<number | boolean>(0);

  function changeTabHandler(newTab: number) {
    const selectedRoute = tabRoutes[newTab];
    if (selectedRoute) {
      setSelectedTab(newTab);
      navigate(selectedRoute);
    } else {
      setSelectedTab(false);
    }
  }

  // Whenever the url changes, update the selected tab
  useEffect(() => {
    const selectedRoute = tabRoutes.findIndex(route => route === location.pathname);
    if (selectedRoute !== -1) {
      setSelectedTab(selectedRoute);
    } else {
      if (conversationRoutes.filter(route => location.pathname.includes(route)).length > 0) {
        setSelectedTab(2);
      } else {
        setSelectedTab(false);
      }
    }
  }, [location.pathname]);

  if (!isSmall || !isLoggedIn) return null;

  return (
    <CmBottomTabs value={selectedTab} onChange={(_, newValue) => changeTabHandler(newValue)} style={{ backgroundColor: 'white' }}>
      <CmBottomTab icon={<Home fontSize="small" />} label="Home" />
      <CmBottomTab
        icon={<EmojiObjects fontSize="small" />}
        label="Solutions"
      />
      <CmBottomTab
        icon={<QuestionAnswer fontSize="small" />}
        label="Talk"
      />
      <CmBottomTab
        icon={<Announcement fontSize="small" />}
        label="Myths"
      />
    </CmBottomTabs>
  );
}

export default CmBottomTabsNavigation;
