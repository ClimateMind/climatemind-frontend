import React from 'react';
import AppBar from './AppBar';
import BottomMenu from '../BottomMenu';
import { useMediaQuery } from '@material-ui/core';
import theme from '../../common/styles/CMTheme';
import CmAppBarWithMenu from './AppBarWithMenu';

interface Props {
  component: React.ReactNode;
}

const PageWithAppBottomBar: React.FC<Props> = ({ component }) => {
  const isXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {isXS ? 
      (<>
        <AppBar />
        {component}
        <BottomMenu />
      </>) : 
      (<>
        <CmAppBarWithMenu />
        {component}
      </>)}
      {/* <AppBar />
        {component}
      <BottomMenu /> */}
    </>
  );
};

export default PageWithAppBottomBar;
