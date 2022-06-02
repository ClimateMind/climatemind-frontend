import React from 'react';
import VanillaAppBar from '../components/AppBar/VanillaAppBar';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

interface Props {
  children: React.ReactNode;
}

const PageWithVanillaAppBar: React.FC<Props> = ({ children }) => {
  return (
    <>
      <VanillaAppBar />
      <ScrollToTopOnMount />
      {children}
    </>
  );
};

export default PageWithVanillaAppBar;
