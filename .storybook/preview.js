import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import CMTheme from '../src/common/styles/CMTheme';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

if (typeof global.process === 'undefined') {
  const { worker } = require('../src/mocks/browser');
  worker.start();
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
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
};

// All stories are wrapped in the theme
export const decorators = [
  (Story) => (
    <MuiThemeProvider theme={CMTheme}>
      <Story />
    </MuiThemeProvider>
  ),
];
