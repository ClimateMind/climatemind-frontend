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

function CmBottomTabsNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn } = useAppSelector(state => state.auth);
  const isSmall = useMediaQuery('(max-width: 960px)');

  const [selectedTab, setSelectedTab] = useState<number | boolean>(0);

  function changeTabHandler(newTab: number) {
    switch (newTab) {
      case 0:
        navigate(ROUTES.CLIMATE_FEED_PAGE);
        break;
      case 1:
        navigate(ROUTES.SOLUTIONS_FEED_PAGE);
        break;
      case 2:
        navigate(ROUTES.CONVERSATIONS_INTRO_PAGE);
        break;
      case 3:
        navigate(ROUTES.MYTHS_FEED_PAGE);
        break;
      default:
        break;
    }

    setSelectedTab(newTab);
  }

  useEffect(() => {
    if (
      location.pathname !== ROUTES.CLIMATE_FEED_PAGE &&
      location.pathname !== ROUTES.SOLUTIONS_FEED_PAGE &&
      location.pathname !== ROUTES.MYTHS_FEED_PAGE &&
      location.pathname !== ROUTES.CONVERSATIONS_INTRO_PAGE &&
      location.pathname !== ROUTES.CONVERSATIONS_PAGE
    ) {
      setSelectedTab(false);
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
