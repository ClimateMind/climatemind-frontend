import React from 'react';
import CmAppBarWithMenu from './AppBarWithMenu';

interface Props {
  component: React.ReactNode;
}

const PageWithAppBottomBar: React.FC<Props> = ({ component }) => {
  const menuLinks = [
    {
      label: 'Home',
      value: '/climate-feed',
      index: 1,
    },
    {
      label: 'Actions',
      value: '/solutions',
      index: 2,
    },
    {
      label: 'Talk',
      value: '/conversations',
      index: 3,
    },
    {
      label: 'Myths',
      value: '/myths',
      index: 4,
    },
  ];

  return (
    <>
      {/* {isSmall ? (
        <>
          <AppBar />
          {component}
          <BottomMenu />
        </>
      ) : ( */}
        <>
          <CmAppBarWithMenu links={menuLinks} />
          {component}
        </>
      {/* )} */}
    </>
  );
};

export default PageWithAppBottomBar;
