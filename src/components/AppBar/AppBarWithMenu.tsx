import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { AppBar, Grid, IconButton, Tab, Tabs } from '@mui/material';

import AnnouncementIcon from '@mui/icons-material/Announcement';
import CloseIcon from '@mui/icons-material/Close';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';;
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import { AccountIcon } from '../AccountIcon/AccountIcon';
import MenuDrawer from './MenuDrawer';
import ROUTES from '../../router/RouteConfig';
import { useSession } from '../../hooks/useSession';
import { TalkMenuButtonEvent, analyticsService } from 'services';

interface Link {
  label: string;
  value: string;
  index: number;
}

export interface AppBarWithMenuProps {
  links: Link[];
}

const CmAppBarWithMenu: React.FC<AppBarWithMenuProps> = ({
  links,
}: AppBarWithMenuProps) => {
  const [isMenuShowing, setMenu] = useState(false);
  const iconStyle = { height: '20px' };
  const { pathname } = useLocation();
  const { sessionId, hasAcceptedCookies } = useSession();

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
        return undefined;
    }
  };

  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };

  const handleOnChange = (_: any, newValue: any) => {
    if (sessionId && hasAcceptedCookies && newValue === 2) {
      analyticsService.postEvent(TalkMenuButtonEvent);
    }
  };

  const [value, setValue] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (pathname === ROUTES.CLIMATE_FEED_PAGE) {
      setValue(0);
    } else if (pathname === ROUTES.SOLUTIONS_FEED_PAGE) {
      setValue(1);
    } else if (pathname === ROUTES.MYTHS_FEED_PAGE) {
      setValue(3);
    } else if (
      pathname === ROUTES.CONVERSATIONS_INTRO_PAGE ||
      pathname === ROUTES.CONVERSATIONS_PAGE
    ) {
      setValue(2);
    } else {
      setValue(-1);
    }
  }, [pathname]);

  return (
    <>
      <div style={{...styles.root, zIndex: isMenuShowing ? 10100 : 1000}}>
        <AppBar
          position="fixed"
          sx={{ background: '#07373b' }}
          data-testid="AppBarWithMenu"
          id="AppBar"
          aria-label="Climate Mind"
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={styles.navbarLeftSide}>
              <Grid item>
                <AccountIcon />
              </Grid>
              {value !== undefined ? (
                <Tabs value={value} onChange={handleOnChange} centered>
                  {links.map((item) => (
                    <Tab
                      key={item.index}
                      label={
                        <span style={styles.tabLabel}>{item.label}</span>
                      }
                      icon={getIcon(item.value)}
                      component={RouterLink}
                      to={item.value}
                    />
                  ))}
                </Tabs>
              ) : (
                <></>
              )}
            </div>

            <Grid style={styles.rightCol}>
              <IconButton
                edge="start"
                id="TopMenuToggle"
                color="inherit"
                aria-label="menu"
                aria-expanded={isMenuShowing}
                onClick={handleMenu}
              >
                {isMenuShowing ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </AppBar>
      </div>
      {/* {isSmall ? (
        <MenuPaper isShowing={isMenuShowing} setIsShowing={setMenu} />
      ) : ( */}
      <MenuDrawer isShowing={isMenuShowing} setIsShowing={setMenu} />
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  tabLabel: {
    fontSize: '12px',
    textTransform: 'none',
    marginTop: '-8px',
    marginBottom: '-8px',
  },
  rightCol: {
    paddingLeft: '24px',
  },
  navbarLeftSide: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
};

export default CmAppBarWithMenu;
