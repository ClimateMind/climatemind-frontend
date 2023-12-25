import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import { AppBar, Grid, IconButton, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import AnnouncementIcon from '@material-ui/icons/Announcement';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import CloseIcon from '@material-ui/icons/Close';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import { AccountIcon } from '../AccountIcon/AccountIcon';
import MenuPaper from './MenuPaper';
import MenuDrawer from './MenuDrawer';
import theme from '../../common/styles/CMTheme';
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

interface StyleProps {
  isMenuShowing: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: (props: StyleProps) => (props.isMenuShowing ? 10100 : 1000),
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
  })
);

const CmAppBarWithMenu: React.FC<AppBarWithMenuProps> = ({
  links,
}: AppBarWithMenuProps) => {
  const [isMenuShowing, setMenu] = useState(false);
  const classes = useStyles({ isMenuShowing });
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
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
      <div className={classes.root}>
        <AppBar
          position="fixed"
          color="default"
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
            <div className={classes.navbarLeftSide}>
              <Grid item>
                <AccountIcon />
              </Grid>
              {value !== undefined ? (
                <Tabs value={value} onChange={handleOnChange} centered>
                  {links.map((item) => (
                    <Tab
                      key={item.index}
                      label={
                        <span className={classes.tabLabel}>{item.label}</span>
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

            <Grid className={classes.rightCol}>
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
      {isSmall ? (
        <MenuPaper isShowing={isMenuShowing} setIsShowing={setMenu} />
      ) : (
        <MenuDrawer isShowing={isMenuShowing} setIsShowing={setMenu} />
      )}
    </>
  );
};

export default CmAppBarWithMenu;
