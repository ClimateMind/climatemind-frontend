import React, { useState } from 'react';
import {
  Typography,
  Theme,
  Button,
  SwipeableDrawer,
  Box,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

export interface DrawerDashboardProps {
  drawerTitle?: string;
  children?: React.ReactNode;
  bgColor?: string;
  offsetAnchorY?: number;
  spaceToTop?: number;
}

const DrawerDashboard: React.FC<DrawerDashboardProps> = ({
  drawerTitle = 'conversations',
  children,
  bgColor,
  offsetAnchorY = 0,
  spaceToTop = 0,
}: DrawerDashboardProps) => {
  const useStyles = makeStyles<Theme, DrawerDashboardProps>((theme: Theme) =>
    createStyles({
      root: {
        padding: `0 8px`,
      },
      paper: (props: DrawerDashboardProps) => ({
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        height: `calc(100% - ${props.spaceToTop}px)`,
        backgroundColor: bgColor ? bgColor : '#FFF',
      }),
      dashContainer: {
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
      },
      buttonDrawer: (props: DrawerDashboardProps) => ({
        position: 'absolute',
        bottom: props.offsetAnchorY,
        left: 0,
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        backgroundColor: bgColor ? bgColor : '#FFF',
      }),
      buttonText: {
        letterSpacing: '1pt',
        fontSize: '10px',
      },
    })
  );

  const props = {
    drawerTitle,
    children,
    bgColor,
    offsetAnchorY,
    spaceToTop,
  };

  const classes = useStyles(props);

  const [showDash, setShowDash] = useState(false);

  const handleShowClick = () => {
    setShowDash(!showDash);
  };

  return (
    <div data-testid={`dashboard-drawer-${showDash ? 'open' : 'closed'}`}>
      <Button
        fullWidth
        className={classes.buttonDrawer}
        onClick={handleShowClick}
        data-testid="dashboard-drawer-button"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <KeyboardArrowUpIcon />
          <Typography
            className={classes.buttonText}
            gutterBottom
            variant="h3"
            component="h3"
          >
            {drawerTitle}
          </Typography>
        </Box>
      </Button>
      <SwipeableDrawer
        classes={{
          paper: classes.paper,
        }}
        anchor="bottom"
        open={showDash}
        onClose={handleShowClick}
        onOpen={handleShowClick}
      >
        <Button
          fullWidth
          className={classes.closeDrawer}
          onClick={handleShowClick}
          data-testid="close-drawer-button"
        >
          <KeyboardArrowDownIcon />
        </Button>
        <div className={classes.dashContainer}>{children}</div>
      </SwipeableDrawer>
    </div>
  );
};

export default DrawerDashboard;
