import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import CMTheme from '../src/common/styles/CMTheme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <MuiThemeProvider theme={CMTheme}>
      <Story />
    </MuiThemeProvider>
  ),
];
