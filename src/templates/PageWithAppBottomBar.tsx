import { AppBar, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import CmAppBarWithMenu from '../components/AppBar/AppBarWithMenu';
import { BottomMenu } from '../components/BottomMenu';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

interface Props {
  children: React.ReactNode;
}

const PageWithAppBottomBar: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const menuLinks = [
    {
      label: 'Feed',
      value: '/climate-feed',
      index: 1,
    },
    {
      label: 'Actions',
      value: '/solutions',
      index: 2,
    },
    {
      label: 'Myths',
      value: '/myths',
      index: 3,
    },
    {
      label: 'Talk',
      value: '/conversations',
      index: 4,
    },
  ];

  return (
    <>
      <ScrollToTopOnMount />
      {isSmall ? (
        <>
          <AppBar />
          {children}
          <BottomMenu />
        </>
      ) : (
        <>
          <CmAppBarWithMenu links={menuLinks} />
          {children}
        </>
      )}
    </>
  );
};

export default PageWithAppBottomBar;
