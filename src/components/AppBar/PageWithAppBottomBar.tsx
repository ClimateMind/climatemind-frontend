import React from 'react';
import AppBar from './AppBar';
import BottomMenu from '../BottomMenu';

interface Props {
  component: React.ReactNode;
}

const PageWithAppBottomBar: React.FC<Props> = ({ component }) => {
  return (
    <>
      <AppBar />
      {component}
      <BottomMenu />
    </>
  );
};

export default PageWithAppBottomBar;
