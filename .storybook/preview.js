import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import CMTheme from '../src/common/styles/CMTheme';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

if (typeof global.process === 'undefined') {
  const { worker } = require('../src/mocks/browser')
  worker.start()
}

const customViewports = {
  iPhoneX: {
    name: 'iPhone X',
    styles: {
      width: '375px',
      height: '812px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  viewport: {
    viewports: {
      ...customViewports,
      ...MINIMAL_VIEWPORTS,
    },
    defaultViewport: 'iPhoneX',
  },
};

// Wrapper which goes around all stories
const Wrapper = ({ children }) => {
  const wrapperStyles = {
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return <div style={wrapperStyles}>{children}</div>;
};

// All stories are wrapped in the theme
export const decorators = [
  (Story) => (
    <MuiThemeProvider theme={CMTheme}>
      <Story />
    </MuiThemeProvider>
  ),
];
