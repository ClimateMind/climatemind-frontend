import React from 'react';
import AppBar from './AppBar';
import { BottomMenu } from '../BottomMenu';
import { useMediaQuery } from '@material-ui/core';
import theme from '../../common/styles/CMTheme';
import CmAppBarWithMenu from './AppBarWithMenu';

interface Props {
  component: React.ReactNode;
}

const PageWithAppBottomBar: React.FC<Props> = ({ component }) => {
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
