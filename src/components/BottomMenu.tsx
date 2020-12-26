import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box, Theme } from '@material-ui/core';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import CardIcon from './CardIcon';
import { COLORS } from '../common/styles/CMTheme';
import { useHistory } from 'react-router-dom';

export interface BottomMenuProps {
  // title: string;
  // index: number;
  // cardIcon?: 'adaptation' | 'mitigation' | 'idea' | false;
  // bgColor?: string;
  // preTitle?: string;
  // preTitleStyle?: 'positive' | 'warning';
}

const BottomMenu: React.FC<BottomMenuProps> = ({}: BottomMenuProps) => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100vw',
        position: 'fixed',
        bottom: 0,
        // padding: '1em 0',
        // width: '100%',
        // backgroundColor: bgColor ? bgColor : 'inherit',
        // '&$selected': {
        //   border: '1px solid black',
        //   backgroundColor: 'black',
        // },
      },
      stickToBottom: {
        border: '1px solid red',
      },
      selected: {
        // color: "red",
        border: '1px solid black',
     },
      
    })
  );

  const classes = useStyles();
  const [value, setValue] = useState('climate-feed');
  const history = useHistory();

  const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
    history.push(`/${newValue}`);
    setValue(newValue);
  };
  
  return (
    <div className={classes.root} data-testid="BottomMenu">
      <BottomNavigation value={value} onChange={handleChange} showLabels className={classes.stickToBottom}>
        <BottomNavigationAction label="Recents" value="climate-feed" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" value="myths" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default BottomMenu;
