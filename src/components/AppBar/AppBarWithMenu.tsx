import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as Logo } from '../../assets/cm-logo-bright.svg';
// import { ReactComponent as Logo } from '../../assets/socials/Twitter.svg';
import MenuPaper from './MenuPaper';
import theme from '../../common/styles/CMTheme';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HomeIcon from '@material-ui/icons/Home';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Link as RouterLink } from 'react-router-dom';

import {
  useScrollTrigger,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Slide,
  useMediaQuery,
  Tabs,
  Tab,
  Box,
  Grid,
} from '@material-ui/core';
import { useNoSessionRedirect } from '../../hooks/useNoSessionRedirect';
import { useHistory } from 'react-router-dom';

interface StyleProps {
  isMenuShowing: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      zIndex: (props: StyleProps) => (props.isMenuShowing ? 10100 : 1000),
      position: 'relative',
    },
    title: {
      flexGrow: 1,
      color: theme.palette.primary.main,
      marginLeft: theme.spacing(2),
      textAlign: 'center',
    },
    menuButton: {
      flexGrow: 1,
      // "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" },
      // "&:active, &.Mui-focusActive": {backgroundColor:"white",}
      "& :visited": { color: "red" },
      "& :hover": { borderBottom: '2px solid white',},
      "& :active": { color: "green" }
    },
    customHoverFocus: {
      "&:hover, &.Mui-focusVisible": { backgroundColor: "yellow" }
    },
    tabLabel: {
      fontSize: '12px',
      textTransform: 'none',
      marginTop: '-8px',
      marginBottom: '-8px',
    },
    iconContainer: {
      border: '1px solid white'
    },
    customAppBar: {
      height: '64px',
    },
    leftCol: {
      // border: '1px solid white'
    },
    rightCol: {
      // border: '1px solid white',
      paddingLeft: '24px',
    }
  })
);

const CmAppBarWithMenu: React.FC = () => {
  const [isMenuShowing, setMenu] = useState(false);
  const [state, setState] = useState('/climate-feed');
  const classes = useStyles({ isMenuShowing });
  const trigger = useScrollTrigger();
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));
  const iconStyle = { height: '20px'};
  const logoStyle = { height: '32px' };

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
  
  const handleMenu = () => {
    setMenu(!isMenuShowing);
  };
  
  const history = useHistory();
  useNoSessionRedirect();

  const handleClick = (event: any) => {
    console.log({ event });
    // setState(newValue);
    // history.push(`${newValue}`);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  }

  return (
    <>
      <div className={classes.root}>
        <Slide in={!trigger}>
          <AppBar
            position="fixed"
            color="default"
            data-testid="AppBar"
            id="AppBar"
            aria-label="Climate Mind"
            // className={classes.customAppBar}
          >
            {/* <Toolbar variant="dense" disableGutters={true}> */}
              {/* <Typography variant="h6" className={classes.title}>
                  Climate Mind
                </Typography> */}
              {/* <Box className={classes.iconContainer}>
                <Logo style={logoStyle} data-testid="climate-mind-logo" />
              </Box> */}
              <Grid 
                container 
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid className={classes.leftCol}>
                  <Logo style={logoStyle} data-testid="climate-mind-logo" />
                </Grid>
                <Grid>
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
                    <Tab 
                      label={<span className={classes.tabLabel}>Feed</span>} 
                      icon={<HomeIcon style={iconStyle} data-testid="BottomMenuIconsFeed" />} 
                      component={RouterLink} 
                      to="/climate-feed" 
                    />
                    <Tab 
                      label={<span className={classes.tabLabel}>Actions</span>}  
                      icon={<EmojiObjectsIcon style={iconStyle} data-testid="BottomMenuIconsSolutions"/>} 
                      component={RouterLink} 
                      to="/solutions" 
                    />
                    <Tab 
                      label={<span className={classes.tabLabel}>Myths</span>} 
                      icon={<AnnouncementIcon style={iconStyle} 
                      data-testid="BottomMenuIconsAnnouncementIcon" />} 
                      component={RouterLink} 
                      to="/myths" 
                      />
                    <Tab 
                      label={<span className={classes.tabLabel}>Conversations</span>} 
                      icon={<QuestionAnswerIcon style={iconStyle} data-testid="BottomMenuIconsConv" />} 
                      component={RouterLink} 
                      to="/conversations" 
                    />
                  </Tabs>
                </Grid>
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
            {/* </Toolbar> */}
          </AppBar>
        </Slide>
      </div>

      <MenuPaper isShowing={isMenuShowing} setIsShowing={setMenu} />
    </>
  );
};

export default CmAppBarWithMenu;
