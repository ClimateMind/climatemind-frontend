import React from 'react';
import VanillaAppBar from './VanillaAppBar';

interface Props {
  component: React.ReactNode;
}

const PageWithVanillaAppBar: React.FC<Props> = ({ component }) => {
  return (
    <>
      <VanillaAppBar />
      {component}
    </>
  );
};

export default PageWithVanillaAppBar;
