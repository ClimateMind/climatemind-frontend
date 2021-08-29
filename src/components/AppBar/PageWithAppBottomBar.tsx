import React from 'react';
import AppBar from './AppBar';
import BottomMenu from './BottomMenu';
import { useMediaQuery } from '@material-ui/core';
import theme from '../../common/styles/CMTheme';
import CmAppBarWithMenu from './AppBarWithMenu';
import { menuLinks } from './menuLinks';

interface Props {
  component: React.ReactNode;
}

const PageWithAppBottomBar: React.FC<Props> = ({ component }) => {
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isSmall ? (
        <>
          <AppBar />
          {component}
          <BottomMenu />
        </>
      ) : (
        <>
          <CmAppBarWithMenu links={menuLinks} />
          {component}
        </>
      )}
    </>
  );
};

export default PageWithAppBottomBar;
