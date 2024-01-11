import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AnnouncementIcon from '@mui/icons-material/Announcement';

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
      if (conversationRoutes.includes(location.pathname)) {
        setSelectedTab(2);
      } else {
        setSelectedTab(false);
      }
    }
  }, [location.pathname]);

  if (!isSmall || !isLoggedIn) return null;

  return (
    <CmBottomTabs value={selectedTab} onChange={(_, newValue) => changeTabHandler(newValue)} style={{ backgroundColor: 'white' }}>
      <CmBottomTab icon={<HomeIcon fontSize="small" />} label="Home" />
      <CmBottomTab
        icon={<EmojiObjectsIcon fontSize="small" />}
        label="Solutions"
      />
      <CmBottomTab
        icon={<QuestionAnswerIcon fontSize="small" />}
        label="Talk"
      />
      <CmBottomTab
        icon={<AnnouncementIcon fontSize="small" />}
        label="Myths"
      />
    </CmBottomTabs>
  );
}

export default CmBottomTabsNavigation;
